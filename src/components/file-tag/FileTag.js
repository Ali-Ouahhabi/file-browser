import React from "react"
import "./FileTag.scss"
import { ImFolder, ImFolderOpen, ImFileText2 } from "react-icons/im";
import { DragSource, DropTarget } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import { Actions, setAction } from "../../redux/actions/Actions";
import { connect } from "react-redux";
import Status from "../status/status";

class FileTag extends React.Component {

	state = {
		isToggled: false,
		selected:false
	}

	constructor(props) {
		super(props);
		this.clicked =this.clicked.bind(this)
		this.onDrop =this.onDrop.bind(this)
		this.selected =this.selected.bind(this)
	}

	getSelf() {
		return this.props.self;
	}



	onDrop(props, monitor, component) {

		if (this.props.self.isFile)
			return this.props.parent.onDrop(props, monitor, component)

		if (monitor.getItemType() === NativeTypes.FILE) {
			let items = monitor.getItem().items
			this.props.dispatch(
				setAction(
					Actions.DataConverter.UPLOAD,
					{ items: items, subTree: this.props.self }
				)
			)

		} else {
			let item = monitor.getItem()

			if(this.props.self.children[item.index[item.index.length-1]]===item) return;
			this.props.dispatch(
				setAction(
					Actions.FileManager.FOLDER.MOVE.REMOTE,
					{ from: item, to: this.props.self }
				)
			)
		}

	}

	getPath() {
		return (this.props.parent ? this.props.parent.getPath() : "") + (this.props.self.isFile ? "" : this.props.self.name + "/");
	}

	sortBy() { }

	clicked(e) {
		e.preventDefault();
		this.setState({ isToggled: !this.state.isToggled });
		this.props.dispatch(
			setAction(
				Actions.DataConverter.SELECTED,{
				self:this.props.self,
				view:this.selected
		}))
	}

	selected(){
		this.setState({ selected: !this.state.selected });
	}

	retry(){
		
	}

	//add status
	render() {
		let name = "file-tag-" + (this.props.self.isFile ? "file" : "folder")
		let children = () => {
			let tmp = []
			if (this.props.self.children && this.state.isToggled) {
				return this.props.self.children.map((child, index) => {
					tmp = this.props.index.concat(index)
					return (
						<FileTagC key={index + child.name}
							id={index}
							index={tmp}
							parent={this}
							self={child}
							path={this.props.path + "/" + child.name}
						/>
					)
				})
			}

		}

		return ([
			this.props.connectDragSource(this.props.connectDropTarget(
				<div key="head"
					className={name + (!this.props.self.isFile && this.props.isOver ? "-hover" : "") + (this.state.selected?"-selected":'')}
					onClick={this.clicked}
				>
					<div>{this.props.filter || ""}</div>
					<span className={"file-tag-icon"}>
						{this.props.self.isFile ? <ImFileText2 /> : this.state.isToggled ? <ImFolderOpen /> : <ImFolder />}
					</span>
					<span className={"file-tag-name"}> {this.props.self.name}</span>
					<Status status={this.props.self.status} retry={this.retry}></Status>
				</div>
			)),
			<div key="body"
				className={name + "-children"}>
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
	},

}

const dragContent = {
	beginDrag(props, monitor, component) {
		return props.self; 
	},
}

const FileTagT = DragSource('FT', dragContent, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging()
}))(
	DropTarget(['FT', NativeTypes.FILE], dropCall, (connect, monitor) => ({
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver()
	}))(FileTag)
);

function mapDispatchToProps(dispatch) {
	return {
		dispatch: todo => dispatch(todo)
	};
}

const FileTagC = connect(
	null,
	mapDispatchToProps
)(FileTagT);

export default FileTagC;