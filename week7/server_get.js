const express = require("express");
//const http = require("http");

const mongoose = require("mongoose");
const contactRoutes = require("./routes/contactRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");
const socketIo = require("socket.io");




const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);
const uri =
  "mongodb+srv://s223654321:H7uDcmOy0UTjPVAl@cluster0.opevcdh.mongodb.net/test";

  const { Socket } = require('socket.io');
const http = require('http').createServer(app);
const io = socketIo(http);

app.use(express.static("public"));
// app.use(express.static(__dirname + '/'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

app.use("/api", contactRoutes);
app.use("/api", scheduleRoutes);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
  // res.sendFile(__dirname + "index.html");
});

io.on('connection', function(socket) {
  console.log('A user connected');

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
     console.log('A user disconnected');
  });
});

function onUserConnect(socket) {
  const ip = socket.request.connection.remoteAddress;
  console.log(`User connected with IP: ${ip}`);
  socket.timer = setInterval(() => {
    console.log(`User ${ip} is still connected`);
  }, 10000); 
}

function onUserDisconnect(socket) {
  const ip = socket.request.connection.remoteAddress;
  console.log(`User disconnected with IP: ${ip}`);
  if (socket.timer) {
    clearInterval(socket.timer);
  }
}

const users = new Set();

io.on("connection", (socket) => {
  users.add(socket.id);
  io.emit("user count", users.size);

  onUserConnect(socket);
 
  socket.on('browserDetails', (details) => {
    console.log(`Received Browser Details: User-Agent: ${details.userAgent}, Platform: ${details.platform}, Language: ${details.language}`);
  });


  socket.on("chat message", (msg) => {
    console.log("Message received: " + msg);
    io.emit("chat message", msg); 
  });

  socket.on("disconnect", () => {
    users.delete(socket.id);
    io.emit("user count", users.size);
    onUserDisconnect(socket);
    

  });

  socket.on("update schedule", (newSchedule) => {
    io.emit("update schedule", newSchedule);
  });
});









const port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
