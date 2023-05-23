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
      const { userId } = req.params;

      // Find the user and populate the thoughts
      const user = await User.findOne({ _id: userId }).populate('thoughts');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      // Delete the thoughts associated with the user
      await Thought.deleteMany({ _id: { $in: user.thoughts.map(thought => thought._id) } });

      // Delete the user
      await User.deleteOne({ _id: userId });

      res.json({ message: 'User and thoughts deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting user', error: err.message });
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
      const friendIndex = user.friends.indexOf(friendId);
      if (friendIndex === -1) {
        return res.status(404).json({ message: 'Friend not found' });
      }
      user.friends.splice(friendIndex, 1);
  
    
      // Save the updated user
      await user.save();
    // Update the friend count
    const updatedUser = await User.findById(userId).populate('friends');
      res.json({ message: 'Friend removed successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error removing friend', error: err.message });
    }
  }  
}