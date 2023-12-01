import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import 'dotenv/config'

import { Server } from 'socket.io'
import { createServer } from 'node:http'

const app = express()
const port = process.env.PORT ?? 3000
const server = createServer(app)
const io = new Server(server, {
  connectionStateRecovery: {
    // the backup duration of the sessions and the packets
    maxDisconnectionDuration: 2 * 60 * 1000,
    // whether to skip middlewares upon successful recovery
    skipMiddlewares: true,
  },
  cors: {
    origin: '*'
  }
})

io.on('connection', (socket) => {

  console.log(`User ${socket.id} has connect`);

  socket.on('message', (msg) => {
    console.log('message: ' + JSON.stringify(msg));
    io.emit('chat', msg)
  });
  socket.on('hi', () => {
    console.log(`Hello, user ${socket.id}! How are you?`);
  });

  socket.on('disconnect', ()=>{
    console.log(`User ${socket.id} has disconnect`);
  })
});

const config = {
  origin: "*",
  methods: ["GET","HEAD","PUT","PATCH","POST","DELETE"],
  preflightContinue: false,
  optionsSuccessStatus: 204
}
app.use(cors(config))
app.use(logger('dev'))

app.get('/', (req, res) => {
  res.status(200).json('Juan & Gina')
});
// app.use('/', router)

server.listen(port, () => {
  console.log(`Server listen on port ${port}`);
})

