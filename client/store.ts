import Vue from "vue"
import Vuex from "vuex"
import Path from "@/models/path.model"
import Dot from "@/models/dot.model"
import io from "socket.io-client"

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		currentPath: new Path(),
		socket: io.connect(process.env.NODE_ENV === "production" ? location.href : "localhost:3001")
	},
	mutations: {
		resetPath(state) {
			state.currentPath = new Path(
				[],
				state.currentPath.color,
				state.currentPath.width,
				state.currentPath.isEraser
			)
		},
		addDotToCurrentPath(state, { x, y }) {
			state.currentPath.addDot(new Dot(x, y))
		},
		setColor(state, color: string) {
			state.currentPath.color = color
		},
		setWidth(state, width: number) {
			state.currentPath.width = width
		},
		setIsEraser(state, isEraser: boolean) {
			state.currentPath.isEraser = isEraser
		}
	},
	actions: {
	},
	getters: {
	}
})
