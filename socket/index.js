const io = require('socket.io')(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

// const addUser = (userId, socketId) => {
//   !users.some((user) => user.userId === userId) &&
//     users.push({ userId, socketId});
//     // console.log(users)
// };

const addUser = (userId, socketId, username) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId, username });
  // console.log(users)
};
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  
  return users.find((user) => user.userId === userId);

};

io.on("connection", (socket) => {
  console.log('user connected')

  io.emit("firstevent", "hello this is trest")
  // io.emit("welcome","socket server")
  //for client
  // socket.on takes event from server
  // socket.emit send event to server

  //for server
  // socket.on takes event from client
  // io sends event to client
  // io.emit sends every client
  // io.to(socketID).emit sends to one client

  //take userId and socketId from user


  socket.on('addUser', (userId) => {
    // console.log('Received data:', userId, socket.id,userId.username);
    addUser(userId._id, socket.id, userId.username);
    // console.log(userId._id)
    io.emit("getUsers", users);

  });
  socket.on("sendNotification", ({ senderName, senderId, receiverId, type }) => {
    const receiver = getUser(receiverId)
    // console.log('Received data:',  receiver);

    io.to(receiver.socketId).emit("getNotification", {
      senderName,
      senderId,
      type,
    });
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    // console.log(user)
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});