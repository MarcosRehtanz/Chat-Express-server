
export class PublicSocket {
    constructor(io, socket) {
        this.io = io
        this.socket = socket
        this.id = socket.id
    }

    on(input, response) {
        this.socket.on(input, (item) => {
            console.log(`${input}: ` + JSON.stringify(item));


            const room = this.socket.connectedRoom
            this.io.to(room).emit(response, item)
        })
    }
    disconect() {
        this.socket.on('disconnect', () => {
            console.log(`User ${this.socket.id} has disconnect`);
        })
    }
    connectToRoom() {
        this.socket.on('connectToRoom', (room) => {
            if (this.socket.connectedRoom) {
                this.socket.leave(this.socket.connectedRoom)
            }
            console.log(room);
            this.socket.connectedRoom = room;
            this.socket.join(room)
        })
    }
    hi() {
        this.socket.on('hi', () => {
            console.log(`Hello, user ${this.socket.id}! How are you?`);
        });
    }
}