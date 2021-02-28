import React from "react"
import "./FileTag.scss"
import { ImFolder, ImFolderOpen, ImFileText2 } from "react-icons/im";
import { DragSource, DropTarget } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";




class FileTag extends React.Component {
	/**/
	state = {
		name: "",
		isFile: "",
		index: "",//optional if not by reference
		isToggeld: true
	}



	constructor(props) {
		super(props);
		this.state = {
			...this.state,
			parent: props.parent,
			self: props.self
		}
		this.getSelf = this.getSelf.bind(this);
		this.onDrop = this.onDrop.bind(this)

	}

	getSelf() {
		return this;
	}

	onDrop(props, monitor, component) {
		if (this.state.self.isFile)
			return this.state.parent.onDrop(props, monitor, component)
		if (monitor.getItemType() === NativeTypes.FILE) {
			let items = monitor.getItem().items
			this.props.reportChange(items, this.props.index)
		} else {
			let item = monitor.getItem()

			if (item.index === this.props.index || this.props.path.startsWith(item.path))
				return;
			this.props.reportChange(item.index, this.props.index)
		}

	}

	emit(str, obj) { }

	getPath() {
		return (this.state.parent ? this.state.parent.getPath() + "/" : "") + this.state.name;
	}

	sortBy() { }
	togel() { }

	render() {
		let children = () => {
			let tmp = []
			if (this.props.self.children && this.state.isToggeld) {
				return this.props.self.children.map((child, index) => {
					tmp = this.props.index.concat(index)
					return (
						<FileTagC key={index + child.name} id={index} index={tmp} reportChange={this.props.reportChange} parent={this} self={child} path={this.props.path + "/" + child.name}
						/>
					)
				})
			}
		};
		let name = "file-tag-" + (this.state.self.isFile ? "file" : "folder")


		return ([
			this.props.connectDragSource(this.props.connectDropTarget(
				<div key="head" className={name}
					onClick={(e) => { e.preventDefault(); this.setState({ isToggeld: !this.state.isToggeld }) }}

				><div>{this.props.filter || ""}</div>
					<span className={"file-tag-icon"}>
						{this.state.self.isFile ? <ImFileText2 /> : this.state.isToggeld ? <ImFolderOpen /> : <ImFolder />}
					</span>
					<span className={"file-tag-name"}> {this.props.self.name}</span>
				</div>)),
			<div key="body" className={name + "-children"}>
				{
					children()
				}
			</div>
		])

	}

}

const dropCall = {
	drop(props, monitor, component) {
		if (component instanceof FileTag) {
			component.onDrop(props, monitor, component)
			return
		}
	}
}
const dragContent = {
	beginDrag(props, monitor, component) {
		return { index: props.index }
	},
}

const FileTagC = DragSource('FT', dragContent, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging()
}))(
	DropTarget(['FT', NativeTypes.FILE], dropCall, connect => ({
		connectDropTarget: connect.dropTarget(),
	}))(FileTag)
);

export default FileTagC;