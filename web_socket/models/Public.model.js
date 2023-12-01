
export class PublicSocket {
    constructor(io, socket) {
        this.io = io
        this.socket = socket
        this.id = socket.id
    }

    on(req, res){
        this.socket.on(req, (item) => {
            console.log(`${req}: ` + JSON.stringify(item));
            this.io.emit(res, item)
        })
    }
    disconect(){
        this.socket.on('disconnect', () => {
            console.log(`User ${this.socket.id} has disconnect`);
        })
    }
    hi(){
        this.socket.on('hi', () => {
            console.log(`Hello, user ${this.socket.id}! How are you?`);
        });
    }
}