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
	}

	private addClick(mouseX: number, mouseY: number) {
		const x = mouseX - this.offsetLeft
		const y = mouseY - this.offsetTop
		this.addDotToCurrentPath({ x, y })
		this.renderDot()
	}

	private renderDot() {
		const { dots, color, width } = this.currentPath
		this.context.strokeStyle = color
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
}

</script>

<style scoped lang="stylus">
canvas
	border 1px solid black
</style>
