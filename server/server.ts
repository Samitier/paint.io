import express from "express"
import http from "http"
import path from "path"
import compression from "compression"
import SocketsService from "./sockets.service"
// tslint:disable-next-line:no-var-requires
const sslRedirect = require("heroku-ssl-redirect")

const app = express()
	// Gzip
	.use(compression())
	// Heroku https redirect
	.use(sslRedirect())
	// Setting the static file server to the folder "public"
	.use(express.static(path.join(__dirname, "../dist")))
	// Return index.html instead on 404
	.use((_, res) => res.sendFile(path.join(__dirname, "../dist/index.html")))

const port = process.env.port ? parseInt(process.env.port, 10) : 3001
const socketsPort = process.env.socketsPort ? parseInt(process.env.socketsPort, 10) : 3002

const server = http.createServer(app)
	.listen(port)
	.on(
		"listening",
		// tslint:disable-next-line:no-console
		() => console.log("Server listening on port " + port)
	)

const socketsService = new SocketsService(socketsPort)
