<template>
	<div class="sidebar">
		<input class="color" type="color" name="color" v-model="color">
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

	get color() {return this.currentPath.color }
	set color(c: string) { this.setColor(c) }
}
</script>

<style lang="stylus">
.sidebar
	padding .5em 1em 
.color
	width 3em
	height 3em
</style>
