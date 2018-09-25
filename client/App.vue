<template>
	<main class="fullscreen main-container">
		<DrawingArea/>
		<Sidebar/>
	</main>
</template>

<script lang="ts">
	import { Component, Vue } from "vue-property-decorator"
	import { Mutation, State } from "vuex-class"
	import "socket.io-client"
	import DrawingArea from "@/components/drawing-area.vue"
	import Sidebar from "@/components/sidebar.vue"

	@Component({
		components: { DrawingArea, Sidebar }
	})
	export default class App extends Vue {}
</script>
<style lang="stylus">
	@import "./styles"

	.main-container
		display flex
</style>
