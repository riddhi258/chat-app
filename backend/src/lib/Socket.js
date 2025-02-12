const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);

// Create a single instance of Server (io)
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const userSocketMap = {}; // Keeps track of the users and their socket IDs

// Get socket ID for a specific user
function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// Handle socket connections
io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  // Get userId from the connection query params
  const userId = socket.handshake.query.userId;

  // If a valid userId is present, map it to the socket id
  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  // Emit the updated list of online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Handle disconnections
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    delete userSocketMap[userId]; // Remove the disconnected user's socket from the map
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Emit the updated online users list
  });
});

module.exports = {
  getReceiverSocketId, // Export the function to get socket id for a user
  io, // Export the io server instance
  app,
  server,
};
