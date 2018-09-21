import Vue from "vue"
import Vuex from "vuex"
import Path from "@/models/path.model"
import Dot from "@/models/dot.model"

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		currentPath: new Path()
	},
	mutations: {
		resetPath(state) {
			state.currentPath = new Path([], state.currentPath.color, state.currentPath.width)
		},
		addDotToCurrentPath(state, { x, y }) {
			state.currentPath.addDot(new Dot(x, y))
		},
		setColor(state, color: string) {
			state.currentPath.color = color
		}
	},
	actions: {
		// onNewAnswer({ commit }, { question, answer }) {
		// 	commit("setAnswer", answer)
		// 	commit("removeQuestion", question)
		// 	commit("changeColors")
		// }
	},
	getters: {
		// result(state) {
		// 	return state.quizz.results.find(r => state.points <= r.totalPoints)
		// },
	}
})
