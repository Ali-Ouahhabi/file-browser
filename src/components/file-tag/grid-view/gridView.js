import React from 'react';
import { NativeTypes } from 'react-dnd-html5-backend';
import { Actions, setAction } from '../../../redux/actions/Actions';
import { GFileTag } from './g-file-tag/GFileTag';
import GFolderTag from './g-folder-tag/GFolderTag';
import { DragSource, DropTarget } from "react-dnd";

import './gridView.scss';
import { DragContent } from '../DnDUtil';
import { connect } from 'react-redux';



function GrideViewChildren(props){
	if (props.children) {
		return props.children.map((child, index) => {
			if (child.isFile)
				return (<GFileTag key={index+child.name} self={child} name={child.name} dispatch={props.dispatch} />);
			else
				return (<GFolderTag key={index+child.name} self={child} name={child.name} dispatch={props.dispatch} />);
		});
	}else return '';
}

class GridView_ extends React.Component {

	onDrop(props, monitor, component) {
		if (monitor.getItemType() === NativeTypes.FILE) {//mostly
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

	render() {
		let renderChildGridView = () => {

			return this.props.connectDropTarget((
				<div className="rootGridView">
					<GrideViewChildren children={this.props.self.children} dispatch={this.props.dispatch}/>
				</div>
			))

		}
		return renderChildGridView();
	}
}

const dropCall = {
	drop(props, monitor, component) {

		if (component instanceof GridView_) {
			component.onDrop(props, monitor, component)
			return
		}
	},

}

const GridView__ = DragSource('FT', DragContent, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging()
}))(
	DropTarget(['FT', NativeTypes.FILE], dropCall, (connect, monitor) => ({
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver()
	}))(GridView_)
);

function mapDispatchToProps(dispatch) {
	return {
		dispatch: todo => dispatch(todo)
	};
}

const GridView = connect(
	null,
	mapDispatchToProps
)(GridView__);

export default GridView;
