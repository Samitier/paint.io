import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
	},
	mutations: {
		// setAnswer(state, answer: Answer) {
		// 	state.points += answer.points
		// }
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
