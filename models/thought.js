const { Schema } = require('mongoose');

const thoughtSchema = new Schema(
  {
    thoughtText:{
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    }
  },
  {
    createdAt:{
      type: Date,
      default: Date.now,
      get: function (createdAt) {
        return createdAt.toLocaleString();
      }
    }
  },
{
  username:{
    type: String,
    required: true,
  }
},
{
  reaction:{
    type: reactionSchema,
  }
},
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
)

const reactionSchema= new Schema(
  {
    reactionId:{
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    }
  },
  {
    reactionBody:{
      type: String,
      required: true,
      maxlength: 280,
    }
  },
  {
    username:{
      type: StaticRange,
      required: true,
    }
  },
  {
    createdAt:{
      type: Date,
      default: Date.now,
      get: function (createdAt) {
        return createdAt.toLocaleString();
        }
      }
    },

)

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reaction.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
