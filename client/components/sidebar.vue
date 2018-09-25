<template>
	<div>
		<div class="container">
			<input ref="inputColor" class="hidden" type="color" name="color" v-model="color">
			<div class="sidebar-item color" :style="colorStyle" @click="openInputColor"></div>
			<div 
				v-for="size in sizes" 
				:key="size"
				class="sidebar-item"
				:class="getSizeClass(size)"
				@click="setPenWidth(size)"
			>
				<i class="fas fa-pen"></i>
			</div>
		</div>
		<div class="container">
			<div 
				class="sidebar-item"
				:class="eraserClass"
				@click="setEraser"
			>
				<i class="fas fa-eraser"></i>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { State, Mutation } from "vuex-class"
import Path from "@/models/path.model"

@Component
export default class Sidebar extends Vue {

	@State currentPath: Path
	@Mutation setColor: (c: string) => void
	@Mutation setWidth: (s: number) => void
	@Mutation setIsEraser: (s: boolean) => void

	sizes: number[] =  [1, 3, 5]

	get color() {return this.currentPath.color }
	set color(c: string) { this.setColor(c) }
	get colorStyle() { return `background-color: ${ this.currentPath.color };`}
	get eraserClass() { return this.currentPath.isEraser ? "active" : "" }

	openInputColor() {
		(this.$refs.inputColor as HTMLElement).click()
	}

	getSizeClass(size: number) {
		const classes = [
			"size-" + size
		]
		if (this.currentPath.width === size && !this.currentPath.isEraser) {
			classes.push("active")
		}
		return classes.concat(" ")
	}

	setPenWidth(width: number) {
		this.setIsEraser(false)
		this.setWidth(width)
	}

	setEraser() {
		this.setWidth(5)
		this.setIsEraser(true)
	}
}
</script>

<style lang="stylus">
.hidden
	visibility hidden
	position absolute
.container
	margin .75em .6em
	padding .3em
	background #F3F3F3
	border-radius 36px
.sidebar-item
	border-radius 50%
	width 2.1em
	height 2.1em
	margin-bottom .2em
	background-color #DFDFDF
	color #444
	cursor pointer
	transition all 0.3s
	display flex
	justify-content center
	text-align center
	flex-direction column
	&.active
		background-color #C5C5C5
	&:hover
		opacity 0.6
	&:last-child
		margin-bottom 0
.size-1 > i
	font-size 14px
.size-3 > i
	font-size 17px
.size-5 > i
	font-size 20px
</style>
