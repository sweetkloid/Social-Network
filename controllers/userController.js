const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('thought')
        .populate('user');
  
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
  
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(course);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        res.status(404).json({ message: 'No user with that ID' });
      }

      await Thought.deleteMany({ _id: { $in: user.thought } });
      res.json({ message: 'User and Thought deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async addFriend(req, res) {
    const { userId, friendId } = req.params;
  
    try {
      // Find the user
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Find the friend
      const friend = await User.findById(friendId);
  
      if (!friend) {
        return res.status(404).json({ message: 'Friend not found' });
      }
  
      // Add the friend's ID to the user's friends array
      user.friends.push(friendId);
  
      // Save the user with the updated friends array
      await user.save();
  
      res.json({ message: 'Friend added successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error adding friend', error: err.message });
    }
  },
  async deleteFriend(req, res) {
    const { userId, friendId } = req.params;
  
    try {
      // Find the user
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Remove the friend from the user's friend list
      user.friends.pull(friendId);
  
      // Save the updated user
      await user.save();
  
      res.json({ message: 'Friend removed successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error removing friend', error: err.message });
    }
  }  
}