<template>
	<main class="fullscreen main-container">
		<DrawingArea/>
		<Sidebar/>
	</main>
</template>

<script lang="ts">
	import { Component, Vue } from "vue-property-decorator"
	import io from "socket.io-client"
	import DrawingArea from "@/components/drawing-area.vue"
	import Sidebar from "@/components/sidebar.vue"

	@Component({
		components: { DrawingArea, Sidebar }
	})
	export default class App extends Vue {
		mounted() {
			const socket = io.connect(location.hostname + ":3002")
			socket.on("news", (data: any) => {
				console.log(data)
			})
		}
	}
</script>
<style lang="stylus">
	@import "./styles"

	.main-container
		display flex
</style>
