import socketio from "socket.io"
import { Server } from "http"

export default class SocketsService {
	private readonly io: socketio.Server

	constructor(port: number) {
		this.io = socketio(port)
		this.io.on("connection", this.onConnection)
	}

	onConnection(socket: socketio.Socket) {
		socket.emit("news", { hello: "world" })
	}
}
