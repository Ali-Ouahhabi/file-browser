import React from "react"
import "./FileTag.scss"
import { ImFolder, ImFolderOpen, ImFileText2 } from "react-icons/im";
import { DragSource, DropTarget } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import { Actions, setAction } from "../../redux/actions/Actions";
import { connect } from "react-redux";
import Status from "../status/status";


function FileTagChildren (props) {
	if (props.children.length>0) {
		return props.children.map((child, index) => {
			console.log("-k> ","key"+child.path + child.name)
			return (
				<FileTagC
					key={index + child.name}
					parent={props.parent}
					self={child}
				/>
			)
		})
	}else return '';

}

function FileTagNameLable(props){
	return <span className={"file-tag-name"}> {props.name}</span>
}


class FileTag extends React.Component {

	state = {
		isToggled: false,
		selected: false
	}

	constructor(props) {
		super(props);
		
		this.onDrop = this.onDrop.bind(this)
		this.doubleClick = this.doubleClick.bind(this)

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

			if (this.props.self.children.filter(e=>e.name===item.name).length!==0) return;
			
			this.props.dispatch(
				setAction(
					Actions.FileManager.FOLDER.MOVE.REMOTE,
					{ from: item, to: this.props.self }
				)
			)
		}

	}

	clicked(e) {
		e.preventDefault();
		this.setState({ isToggled: !this.state.isToggled });
		this.props.dispatch(
			setAction(
				Actions.DataConverter.SELECTED, {
				selectedV: {
					self: this.props.self,
					view: this.selected
				}

			}))
	}

	doubleClick(e) {
		this.props.dispatch(
			setAction(
				Actions.Tree.CURRENT,
				this.props.self
			)
		)
		e.preventDefault();


	}

	componentDidMount(){
		this.clicked = this.clicked.bind(this)
		this.selected = this.selected.bind(this)
	}

	selected() {
		this.setState({ selected: !this.state.selected });
	}


	//add status
	render() {
			return this.renderChildTreeView();
	}

	renderChildTreeView() {
		let name = "file-tag-" + (this.props.self.isFile ? "file" : "folder")


		return ([
			this.props.connectDragSource(this.props.connectDropTarget(
				<div key="head"
					className={name + (!this.props.self.isFile && this.props.isOver ? "-hover" : "") + (this.state.selected ? "-selected" : '')}
					path = {this.props.self.path}
					onClick={this.clicked}
					onDoubleClick={this.doubleClick}>

					<span className={"file-tag-icon"}>
						{this.props.self.isFile ? <ImFileText2 /> : this.state.isToggled ? <ImFolderOpen /> : <ImFolder />}
					</span>

					<FileTagNameLable name = {this.props.self.name}/>
					<Status status={this.props.self.status} retry={this.retry}></Status>
				</div>
			)),
			<div key="body"
				className={name + "-children"}>
				{!this.props.self.isFile&&this.state.isToggled?<FileTagChildren  parent={this} children = {this.props.self.children}/>:''}
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