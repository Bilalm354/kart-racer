import express from 'express'
import socket from 'socket.io'
import http from 'http'

const app = express();
const httpServer = new http.Server(app);
const io = new socket.Server(httpServer);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

httpServer.listen(3000, () => {
  console.log('listening on *:3000');
});