import React from "react"
import "./FileTag.scss"
import { ImFolder, ImFolderOpen, ImFileText2 } from "react-icons/im";
import { DragSource, DropTarget } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import { Status, SubTree } from "../../redux/subTree";
import { setAction } from "../../redux/Actions";
import { connect } from "react-redux";


class FileTag extends React.Component {
	/**/
	state = {
		isToggled: false
	}

	constructor(props) {
		super(props);
		this.promises = []
	}

	getSelf() {
		return this;
	}

	settle(items) {
		this.getFileStructure(items, this.getPath()).then(e => {
			Promise.all(e).then(leafs => {
				console.log("leaf what?? ", leafs)
				Array.from(leafs).forEach(elements => {
					let files = new FormData();
					let meta = []
					Array.from(elements).forEach(element => {
						if (element.isFile) {
							console.log(" seting a file in the FormData")
							files.append("files", element.data);
							meta.push({
								"path": element.path,
								"name": element.name
							})
						} else {
							console.log("the leaf is not a leaf", element);
						}
					})
					files.append(
						'metadata',
						new Blob(
							[JSON.stringify(meta)],
							{ type: 'application/json' }
						)
					);
					this.props.dispatch(setAction(["FILE", "UPLOAD", "REMOTE"], files))
				});
			})
		})




	}

	getFileStructure(items, path = this.getPath()) {
		return new Promise((R) => R(Array.from(items).map(item => {
			if (item instanceof DataTransferItem) item = item.webkitGetAsEntry();
			if (item.isFile) {
				let leaf = new SubTree(item.name)
				leaf.setFrom({
					name: item.name,
					isFile: item.isFile,
					children: null,
					status: new Status("up", "init")
				})
				//push promise of file

				return new Promise((resolve) => {//set index
					item.file((file) => {
						leaf.setPath(path)
						leaf.setData(file)
						resolve([leaf])
					})
				});
			} else if (item.isDirectory) {
				//console.log("isDirectory >", item.name)
				let subTree = new SubTree(item.name);
				subTree.setFrom({
					name: item.name,
					isFile: item.isFile,
					children: [],
					status: new Status("up", "init")
				})
				let tmp = [];
				// // Get folder contents
				var dirReader = item.createReader();
				// dirReader.readEntries((entries) =>
				// 	tmp.push(
				// 		...this.getFileStructure(entries, path + "/" + item.name)
				// 	)

				// )
				// subTree.setChildren(tmp)
				// return subTree;
				return new Promise((resolve) => {
					dirReader.readEntries((entries) =>
						this.getFileStructure(entries, path + item.name + "/").then(e => {
							subTree.setChildren(e)
							Promise.all(e).then(leafs => resolve([].concat(...leafs)))
						})
					);
				})
			}
			else
				return [];
		})
		))
	}

	onDrop(props, monitor, component) {
		if (this.props.self.isFile)
			return this.props.parent.onDrop(props, monitor, component)
		if (monitor.getItemType() === NativeTypes.FILE) {
			let items = monitor.getItem().items
			// this.props.reportChange(items, this.getPath())
			this.settle(items);
		} else {
			let item = monitor.getItem()

			if (item.index === this.props.index || this.props.path.startsWith(item.path))
				return;
			this.props.reportChange(item.index, this.props.index)
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

	//add status
	render() {
		let children = () => {
			let tmp = []
			if (this.props.self.children && this.state.isToggled) {
				return this.props.self.children.map((child, index) => {
					tmp = this.props.index.concat(index)
					return (
						<FileTagC key={index + child.name} id={index} index={tmp} selected={this.props.selected} reportChange={this.props.reportChange} parent={this} self={child} path={this.props.path + "/" + child.name}
						/>
					)
				})
			}
		};
		let name = "file-tag-" + (this.props.self.isFile ? "file" : "folder")


		return ([
			this.props.connectDragSource(this.props.connectDropTarget(
				<div
					key="head"
					className={name + (!this.props.self.isFile && this.props.isOver ? "-hover" : "")}
					onClick={
						(e) => {
							e.preventDefault();
							this.setState({ isToggled: !this.state.isToggled });
							this.emit(this.props.index)
						}
					}

				>
					<div>{this.props.filter || ""}</div>
					<span className={"file-tag-icon"}>
						{this.props.self.isFile ? <ImFileText2 /> : this.state.isToggled ? <ImFolderOpen /> : <ImFolder />}
					</span>
					<span className={"file-tag-name"}> {this.props.self.name}</span>
				</div>
			)),
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
	},

}
const dragContent = {
	beginDrag(props, monitor, component) {
		return { index: props.index, path: props.path }
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