import React from "react"
import "./FileTag.scss"
import { ImFolder, ImFolderOpen, ImFileText2 } from "react-icons/im";
import { DragSource, DropTarget } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import { Actions, setAction } from "../../redux/actions/Actions";
import { connect } from "react-redux";
import Status from "../status/status";
import { Layout } from "../util/layout";

class FileTag extends React.Component {

	state = {
		isToggled: false,
		selected: false
	}

	constructor(props) {
		super(props);
		this.clicked = this.clicked.bind(this)
		this.onDrop = this.onDrop.bind(this)
		this.selected = this.selected.bind(this)
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

			if (this.props.self.children[item.index[item.index.length - 1]] === item) return;
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
				self: this.props.self,
				view: this.selected
			}))
	}

	selected() {
		this.setState({ selected: !this.state.selected });
	}


	//add status
	render() {
		console.log("FileTag layout", this.props.layout)
		if (this.props.layout == Layout.TREE)
			return this.renderChildTreeView();
		else if (this.props.layout == Layout.LIST)
			return this.renderChildListView();
		else if (this.props.layout == Layout.GRID)
			return this.renderChildGridView();
		else
			return (<div>OPss</div>)

	}

	renderChildTreeView() {
		let name = "file-tag-" + (this.props.self.isFile ? "file" : "folder")
		let children = () => {
			let tmp = []
			if (this.props.self.children && this.state.isToggled) {
				return this.props.self.children.map((child, index) => {

					child.path = this.props.self.path + "/" + child.name
					child.index = this.props.self.index.concat(index)
					return (
						<FileTagC
							key={child.index.join("")}
							id={child.index.join("") + child.name}
							parent={this}
							self={child}
							layout={this.props.layout}
						/>
					)
				})
			}

		}

		return ([
			this.props.connectDragSource(this.props.connectDropTarget(
				<div key="head"
					className={name + (!this.props.self.isFile && this.props.isOver ? "-hover" : "") + (this.state.selected ? "-selected" : '')}
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
	getDate(timestamp) {
		let date = new Date();
		date.setTime(timestamp);
		return date.toUTCString();
	}
	bytesToSize(bytes) {
		var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
		if (bytes == 0) return '0 Byte';
		var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
		return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
	}
	//TODO: check draggable and add pagination also the branch ref structure is not handlled in all function dataconverter  
	renderChildListView() {
		let children = () => {
			let tmp = []
			if (this.props.self.children && this.state.isToggled) {
				return this.props.self.children.map((child, index) => {
					child.path = this.props.self.path + "/" + child.name
					child.index = this.props.self.index.concat(index);
					if (child.isFile)
						return (
							this.props.connectDragSource(
								<tr key={child.index.join("")}
									id={child.index.join("") + child.name}
								>
									<td>
										<span className={"file-tag-icon"}>
											<ImFileText2 />
										</span>
									</td>
									<td>{child.name.length > 20 ? child.name.substring(0, 20) + "..." : child.name}</td>
									<td>{this.getDate(child.meta.lastModified)}</td>
									<td>{child.meta.type.length > 20 ? child.meta.type.substring(0, 20) + "..." : child.meta.type}</td>
									<td>{this.bytesToSize(child.meta.size)}</td>
								</tr>
							));
					return (
						this.props.connectDragSource(this.props.connectDropTarget(
							<tr>
								<td>
									<span className={"file-tag-icon"}>
										<ImFolder />
									</span>
								</td>
								<td>{child.name.length > 20 ? child.name.substring(0, 20) + "..." : child.name}</td>
								<td>{"..."}</td>
								<td>{"..."}</td>
								<td>{"..."}</td>
							</tr>
						)))
				});
			}

		}

		this.props.self.path = this.props.self.path
		this.props.self.index = this.props.self.index
		return this.props.connectDropTarget((
			<div className="rootListView">
				<table className="list-view-table">
					<thead>
						<tr>
							<th></th>
							<th>name</th>
							<th>lastModified</th>
							<th>type</th>
							<th>size</th>
						</tr>
					</thead>
					<tbody>
						{children()}
					</tbody>
				</table>
			</div>
		))

	}

	renderChildGridView() {
		let children = () => {
			let tmp = []
			if (this.props.self.children && this.state.isToggled) {
				return this.props.self.children.map((child, index) => {
					child.path = this.props.self.path + "/" + child.name
					child.index = this.props.self.index.concat(index);
					if (child.isFile)
						return (
							this.props.connectDragSource(
								<div className="grid-file">
									<span className={"file-tag-icon"}>
										<ImFileText2 />
									</span>
									<span className={"file-tag-title"}>{child.name.length > 11 ? child.name.substring(0, 11) + ".." : child.name}</span>	
								</div>
							));
					return (
						this.props.connectDragSource(this.props.connectDropTarget(
							<div className="grid-folder">
								<span className={"file-tag-icon"}>
									<ImFolder />
								</span>
								<span className={"file-tag-title"}>{child.name.length > 11 ? child.name.substring(0, 11) + ".." : child.name}</span>

							</div>

						)))
				});
			}

		}

		this.props.self.path = this.props.self.path
		this.props.self.index = this.props.self.index
		return this.props.connectDropTarget((
			<div className="rootGridView">
				{children()}
			</div>
		))

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