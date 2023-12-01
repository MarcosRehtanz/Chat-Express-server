import cors from 'cors'
import logger from 'morgan'
import 'dotenv/config'
import { ws } from './web_socket/web_socket.js'
import { server, app } from './server/server.js'
import { Server } from 'socket.io'

const port = process.env.PORT ?? 3000
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

ws(io)


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

