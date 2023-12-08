import { PublicSocket } from "./models/Public.model.js";

export const ws = (io) => {

    io.on('connection', (s) => {

        const socket = new PublicSocket(io, s)

        console.log(`User ${socket.id} has connect`);

        socket.connectToRoom()
        socket.on('message', 'chat')
        socket.disconect()
        socket.hi()

    });
}