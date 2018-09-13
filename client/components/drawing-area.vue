<template>
	<canvas 
		ref="canvas"
		width="600"
		height="600"
		@mousedown="onStartDraw"
		@mousemove="onDraw"
		@mouseleave="onStopDraw"
		@mouseup="onStopDraw"
	></canvas>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import Path from "@/models/path.model"
import Dot from "@/models/dot.model"

@Component
export default class DrawingArea extends Vue {

	isDrawing: boolean = false

	paths: Path[] = []

	get currentPath() { return this.paths.length ? this.paths[this.paths.length - 1] : null }

	get context() { return (this.$refs.canvas as HTMLCanvasElement).getContext("2d") }
	get offsetLeft() { return (this.$refs.canvas as HTMLCanvasElement).offsetLeft }
	get offsetTop() { return (this.$refs.canvas as HTMLCanvasElement).offsetTop }

	onStartDraw({ pageX, pageY }: MouseEvent) {
		this.isDrawing = true
		this.paths.push(new Path())
		this.addClick(pageX, pageY)
		this.renderPaths()
	}

	onDraw({ pageX, pageY }: MouseEvent) {
		if (!this.isDrawing) return
		this.addClick(pageX, pageY)
		this.renderPaths()
	}

	onStopDraw({ pageX, pageY }: MouseEvent) {
		if (!this.isDrawing) return
		this.addClick(pageX, pageY)
		this.isDrawing = false
		this.renderPaths()
	}

	private addClick(x: number, y: number) {
		this.currentPath.addDot(new Dot(x - this.offsetLeft, y - this.offsetTop))
	}

	private renderPaths() {
		this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
		this.context.lineJoin = "round"
		this.context.lineCap = "round"
		for (const path of this.paths) {
			if (!path.dots.length) continue
			this.context.beginPath()
			this.context.strokeStyle = path.color
			this.context.lineWidth = path.width
			for (const dot of path.dots) {
				this.context.lineTo(dot.x, dot.y)
			}
			this.context.stroke()
		}
	}
}

</script>

<style scoped lang="stylus">
canvas
	border 1px solid black
</style>
