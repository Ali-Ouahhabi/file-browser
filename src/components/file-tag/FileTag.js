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
		isToggled: false
	}

	constructor(props) {
		super(props);
		this.clicked =this.clicked.bind(this)
		this.onDrop =this.onDrop.bind(this)
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

	emit(event) {
		//event.stopPropagation();
		this.props.selected(this.props.index);
	}

	getPath() {
		return (this.props.parent ? this.props.parent.getPath() : "") + (this.props.self.isFile ? "" : this.props.self.name + "/");
	}

	sortBy() { }

	clicked(e) {
		e.preventDefault();
		this.setState({ isToggled: !this.state.isToggled });
		this.emit(this.props.index)
		console.log("Selected Tag")
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
							selected={this.props.selected}
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
					className={name + (!this.props.self.isFile && this.props.isOver ? "-hover" : "")}
					onClick={this.clicked}
				>
					<div>{this.props.filter || ""}</div>
					<span className={"file-tag-icon"}>
						{this.props.self.isFile ? <ImFileText2 /> : this.state.isToggled ? <ImFolderOpen /> : <ImFolder />}
					</span>
					<span className={"file-tag-name"}> {this.props.self.name}</span>
					<span > {/* tempo */ this.props.self.index }</span>
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
function _typeof(obj) {
	"@babel/helpers - typeof";
	if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	  _typeof = function _typeof(obj) {
		return typeof obj;
	  };
	} else {
	  _typeof = function _typeof(obj) {
		return obj &&
		  typeof Symbol === "function" &&
		  obj.constructor === Symbol &&
		  obj !== Symbol.prototype
		  ? "symbol"
		  : typeof obj;
	  };
	}
	return _typeof(obj);
  }
const dragContent = {
	beginDrag(props, monitor, component) {
		console.log("beginDrag _typeof ",_typeof(props.self))
		console.log("beginDrag _typeof ", typeof props.self)
		return props.self//instead we can use self 
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