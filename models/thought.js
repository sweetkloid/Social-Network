const { Schema } = require('mongoose');

const thoughtSchema = new Schema(
  {
    thoughtText:{
      type: String,
      required: true,

    }
  }
)

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
