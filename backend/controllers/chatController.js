const Chat = require('../models/Chat');

// Create or get a chat between two users
exports.getOrCreateChat = async (req, res) => {
  try {
    const { participantId } = req.body; // other user
    const userId = req.user._id;

    let chat = await Chat.findOne({
      participants: { $all: [userId, participantId] },
    });

    if (!chat) {
      chat = new Chat({ participants: [userId, participantId], messages: [] });
      await chat.save();
    }

    res.json(chat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all chats for user
exports.getUserChats = async (req, res) => {
  try {
    const chats = await Chat.find({ participants: req.user._id }).populate(
      'participants',
      'name email'
    );
    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
