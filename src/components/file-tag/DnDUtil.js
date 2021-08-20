import FileTagC from "./FileTag";

export const DropCall = {
	drop(props, monitor, component) {
		if (component instanceof FileTagC) {
			component.onDrop(props, monitor, component)
			return
		}
	},

}

export const DragContent = {
	beginDrag(props, monitor, component) {
		return props.self;
	},
}