const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);

const chatSchema = new Schema(
  {
    participants: [
      { type: Schema.Types.ObjectId, ref: 'User', required: true },
    ], // buyer + farmer
    messages: [messageSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Chat', chatSchema);
