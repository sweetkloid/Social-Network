//require mongoose 
const { Schema, model } = require('mongoose');

//creating schema user
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: function (value) {
          // Custom email validation logic
          return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
        },
        message: 'Please provide a valid email address.',
      },
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'thought',
    }],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'user',
    }],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

//creating the model
const User = model('user', userSchema);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

module.exports = User;
