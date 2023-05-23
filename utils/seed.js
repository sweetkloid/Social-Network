const connection = require('../config/connection');
const { User, Thought } = require('../models');

// Connect to the MongoDB database
connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit the script with an error
});

// Function to seed the database with user and thought data
async function seedDatabase() {
  try {
    // Create an array of sample user data
    const userData = [
      {
        username: 'user1',
        email: 'user1@example.com',
        thoughts: [],
        friends: [],
      },
      {
        username: 'user2',
        email: 'user2@example.com',
        thoughts: [],
        friends: [],
      },
      // Add more user objects as needed
    ];

    // Create an array of sample thought data
    const thoughtData = [
      {
        thoughtText: 'Thought 1',
        username: 'user1', // Set the username of the user who created this thought
      },
      {
        thoughtText: 'Thought 2',
        username: 'user2', // Set the username of the user who created this thought
      },
      // Add more thought objects as needed
    ];

    // Delete existing data from the collections
    await User.deleteMany();
    await Thought.deleteMany();

    // Insert sample user data
    const users = await User.insertMany(userData);

    // Insert sample thought data
    const thoughts = await Thought.insertMany(thoughtData);

    // Update the users' thoughts array with the created thought _ids
    for (let i = 0; i < thoughts.length; i++) {
      const thought = thoughts[i];
      const user = users.find((user) => user.username === thought.username);
      user.thoughts.push(thought._id);
      await user.save();
    }

    console.log('Seed data inserted successfully.');
    process.exit(0); // Exit the script
  } catch (error) {
    console.error('Error seeding the database:', error);
    process.exit(1); // Exit the script with an error
  }
}

// Call the seedDatabase function to start seeding the data
seedDatabase();
