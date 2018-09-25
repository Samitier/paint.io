import Dot from "./dot.model"

export default class Path {

	constructor(
		public dots: Dot[] = [],
		public color: string = "#444444",
		public width: number = 1,
		public isEraser: boolean = false
	) {}

	addDot(c: Dot) {
		this.dots.push(c)
	}
}
