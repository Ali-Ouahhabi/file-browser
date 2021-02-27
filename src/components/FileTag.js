import React from "react"
import "./FileTag.scss"
import { ImFolder, ImFolderOpen, ImFileText2 } from "react-icons/im";
import { ItemTypes } from "./utli/util";
import { DragSource, DropTarget } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";




class FileTag extends React.Component {
	/**/
	state = {
		name: "",
		isFile: "",
		index: "",//optional if not by reference
		isToggeld: false
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
		
		let item = monitor.getItem()
		
		if(item.self == this.state.self || this.props.path.startsWith(item.path))
			return;
		let id = item.id;
		let selfN = {...item.self};
		let origin = item.parent.getSelf()
		selfN.parent = props.self
		this.setState(((state, props) => {
			let newState = {...state}
			newState.self.children = state.self.children.concat(selfN)
			return newState
			
		}),()=>origin.removeChild(id))
	}

	emit(str, obj) { }

	removeChild(id) {
		this.setState((state, props) => {
			let newState = {...state}
			newState.self.children=state.self.children.slice(0, id).concat(state.self.children.slice(id + 1));
			return newState
		})

	}

	getPath() {
		return (this.state.parent ? this.state.parent.getPath() + "/" : "") + this.state.name;
	}

	sortBy() { }
	togel() { }

	render() {
		let children = () => {
			if (this.state.self.children && this.state.isToggeld) {
				return this.state.self.children.map((child, index) => {
					return (
						<FileTagC key={index+child.name} id={index} parent={this} self={child} path={this.props.path+"/"+child.name}
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

				>
					<span className={"file-tag" + "-icon"}>
						{this.state.self.isFile ? <ImFileText2 /> : this.state.isToggeld ? <ImFolderOpen /> : <ImFolder />}
					</span>
					<span className={"file-tag" + "-name"}> {this.props.self.name}</span>

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
		return props
	},
}

const FileTagC = DragSource('FT', dragContent, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging()
}))(
	DropTarget('FT', dropCall, connect => ({
		connectDropTarget: connect.dropTarget(),
	}))(FileTag)
);

export default FileTagC;