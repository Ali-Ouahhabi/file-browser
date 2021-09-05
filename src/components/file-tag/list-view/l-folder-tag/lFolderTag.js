import React from 'react';
import { NativeTypes } from 'react-dnd-html5-backend';
import { ImFolder } from 'react-icons/im';
import { Actions, setAction } from '../../../../redux/actions/Actions';
import './lFolderTag.scss';
import { DragSource, DropTarget } from "react-dnd";

class LFolderTag_ extends React.Component {

	state = {
		selected: false
	}

	constructor(props) {
		super(props);
		this.onDrop = this.onDrop.bind(this)
		this.doubleClick = this.doubleClick.bind(this)
	}


	componentDidMount(){
		this.clicked = this.clicked.bind(this)
		this.selected = this.selected.bind(this)
	}

	selected() {
		this.setState({ selected: !this.state.selected });
	}
	onDrop(props, monitor, component) {
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

	render() {
		return (
			this.props.connectDragSource(this.props.connectDropTarget(
				<tr
					key={"key"+this.props.self.path+this.props.self.name}
					onClick={this.clicked}
					onDoubleClick={this.doubleClick}
				>

					<td>
						<span className={"file-tag-icon"}>
							<ImFolder />
						</span>
					</td>
					<td>{this.props.name.length > 20 ? this.props.name.substring(0, 20) + "..." : this.props.name}</td>
					<td>{"..."}</td>
					<td>{"..."}</td>
					<td>{"..."}</td>
				</tr>
			))
		);
	}
}

const dropCall = {
	drop(props, monitor, component) {

		if (component instanceof LFolderTag_) {
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

const LFolderTag = DragSource('FT', dragContent, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging()
}))(
	DropTarget(['FT', NativeTypes.FILE], dropCall, (connect, monitor) => ({
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver()
	}))(LFolderTag_)
);


export default LFolderTag;
