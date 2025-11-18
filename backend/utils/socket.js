let ioInstance;

module.exports = {
  // Initialize Socket.io with server
  init: (server) => {
    const { Server } = require('socket.io');
    ioInstance = new Server(server, {
      cors: { origin: '*', methods: ['GET', 'POST'] },
    });

    ioInstance.on('connection', (socket) => {
      console.log('New client connected:', socket.id);

      // Join a user-specific room for notifications
      socket.on('joinUser', (userId) => {
        socket.join(userId);
        console.log(`Socket ${socket.id} joined room ${userId}`);
      });

      // Join a chat room
      socket.on('joinRoom', (chatId) => {
        socket.join(chatId);
        console.log(`Socket ${socket.id} joined chat room ${chatId}`);
      });

      // Chat message event
      socket.on('sendMessage', ({ chatId, sender, text }) => {
        const message = { sender, text, timestamp: new Date() };
        ioInstance.to(chatId).emit('receiveMessage', message);
      });

      socket.on('disconnect', () =>
        console.log('Client disconnected:', socket.id)
      );
    });

    return ioInstance;
  },

  // Get the initialized io instance in controllers
  getIO: () => {
    if (!ioInstance) throw new Error('Socket.io not initialized!');
    return ioInstance;
  },
};
