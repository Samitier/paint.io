import socketio from "socket.io"
import { Server } from "http"
import Path from "../client/models/path.model"

export default class SocketsService {

	private readonly io: socketio.Server

	private paths: Path[] = []

	constructor(port: number) {
		this.io = socketio(port)
		this.io.on("connection", s => this.onConnection(s))
	}

	private onConnection(socket: socketio.Socket) {
		socket.emit("renderPaths", { paths: this.paths })
		socket.on("newPath", path => this.onNewPath(socket, path))
	}

	private onNewPath(socket: socketio.Socket, path: Path) {
		this.paths.push(path)
		socket.broadcast.emit("renderPath", path)
	}
}
