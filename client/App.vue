<template>
	<main class="fullscreen">
		<DrawingArea/>
	</main>
</template>

<script lang="ts">
	import { Component, Vue } from "vue-property-decorator"
	import DrawingArea from "@/components/drawing-area.vue"

	@Component({
		components: { DrawingArea }
	})
	export default class App extends Vue {}
</script>
<style lang="stylus">
	@import "./styles"
</style>
