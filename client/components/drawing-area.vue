<template>
	<div>
		<canvas 
			ref="canvas"
			width="600"
			height="600"
			@mousedown="onStartDraw"
			@mousemove="onDraw"
			@mouseleave="onStopDraw"
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

	onStartDraw({ pageX, pageY }: MouseEvent) {
		this.isDrawing = true
		this.resetPath()
		this.addClick(pageX, pageY)
	}

	onDraw({ pageX, pageY }: MouseEvent) {
		if (!this.isDrawing) return
		this.addClick(pageX, pageY)
	}

	onStopDraw({ pageX, pageY }: MouseEvent) {
		if (!this.isDrawing) return
		this.isDrawing = false
		this.addClick(pageX, pageY)
		this.socket.emit("newPath", this.currentPath)
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
