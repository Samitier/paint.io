<template>
	<div>
		<canvas 
			ref="canvas"
			width="600"
			height="600"
			@mousedown="onStartDraw"
			@touchstart="onStartDraw"
			@touchmove.prevent="onDraw"
			@mousemove="onDraw"
			@touchcancel="onStopDraw"
			@mouseleave="onStopDraw"
			@touchend="onStopDraw"
			@mouseup="onStopDraw"
		></canvas>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { State, Mutation } from "vuex-class"
import Path from "@/models/path.model"
import Dot from "@/models/dot.model"

@Component
export default class DrawingArea extends Vue {

	@State currentPath: Path
	@State socket: SocketIOClient.Socket
	@Mutation resetPath: () => void
	@Mutation addDotToCurrentPath: (coords: object) => void
	private isDrawing: boolean = false

	private get context() {
		return (this.$refs.canvas as HTMLCanvasElement).getContext("2d")
	}
	private get offsetLeft() {
		return (this.$refs.canvas as HTMLCanvasElement).offsetLeft
	}
	private get offsetTop() {
		return (this.$refs.canvas as HTMLCanvasElement).offsetTop
	}

	mounted() {
		this.context.lineJoin = this.context.lineCap = "round"
		this.socket.on("renderPath", (p: Path) => this.renderPath(p))
		this.socket.on("renderPaths",
			({ paths }: any) => (paths as Path[]).forEach(p => this.renderPath(p))
		)
	}

	onStartDraw(event: MouseEvent | TouchEvent) {
		this.isDrawing = true
		this.resetPath()
		const [x, y] = this.getCoords(event)
		this.addClick(x, y)
	}

	onDraw(event: MouseEvent | TouchEvent) {
		if (!this.isDrawing) return
		const [x, y] = this.getCoords(event)
		this.addClick(x, y)
	}

	onStopDraw(event: MouseEvent | TouchEvent) {
		if (!this.isDrawing) return
		this.isDrawing = false
		const [x, y] = this.getCoords(event)
		this.addClick(x, y)
		this.socket.emit("newPath", this.currentPath)
	}

	// Util to get the coords of an event without caring if it is a MouseEvent or a TouchEvent
	private getCoords(event: MouseEvent | TouchEvent) {
		if (event instanceof TouchEvent) {
			const touch = event.touches[0] || event.changedTouches[0]
			return [touch.pageX, touch.pageY]
		}
		return [event.pageX, event.pageY]
	}

	private addClick(mouseX: number, mouseY: number) {
		const x = mouseX - this.offsetLeft
		const y = mouseY - this.offsetTop
		this.addDotToCurrentPath({ x, y })
		this.renderDot()
	}

	private renderDot() {
		const { dots, color, width, isEraser } = this.currentPath
		if (isEraser) this.context.strokeStyle = "#FFF"
		else this.context.strokeStyle = color
		this.context.lineWidth = width
		this.context.beginPath()
		if (dots.length === 1)
			this.context.lineTo(dots[0].x, dots[0].y)
		else {
			this.context.moveTo(dots[dots.length - 2].x, dots[dots.length - 2].y)
			this.context.lineTo(dots[dots.length - 1].x, dots[dots.length - 1].y)
		}
		this.context.stroke()
	}

	private renderPath(path: Path) {
		const { dots, color, width, isEraser } = path
		if (isEraser) this.context.strokeStyle = "#FFF"
		else this.context.strokeStyle = color
		this.context.lineWidth = width
		this.context.beginPath()
		for (const dot of path.dots) {
			this.context.lineTo(dot.x, dot.y)
		}
		this.context.stroke()
	}
}

</script>

<style scoped lang="stylus">
canvas
	border 1px solid black
</style>
