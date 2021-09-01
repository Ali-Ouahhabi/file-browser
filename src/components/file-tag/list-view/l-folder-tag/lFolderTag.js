import React from 'react';
import { NativeTypes } from 'react-dnd-html5-backend';
import { ImFolder } from 'react-icons/im';
import { Actions, setAction } from '../../../../redux/actions/Actions';
import './lFolderTag.scss';
import { DragSource, DropTarget } from "react-dnd";
import { DragContent, DropCall } from '../../DnDUtil';
import LFileTag from '../l-file-tag/lFileTag';

class LFolderTag_ extends React.Component {

  state = {
		selected: false
	}

constructor(props) {
    super(props);
		this.clicked = this.clicked.bind(this)
		this.onDrop = this.onDrop.bind(this)
		this.selected = this.selected.bind(this)
		this.doubleClick = this.doubleClick.bind(this)
  }
	selected() {
		this.setState({ selected: !this.state.selected });
	}
  onDrop(props, monitor, component) {
		console.log("LFolderT droping ");
		if (monitor.getItemType() === NativeTypes.FILE) {
			console.log("                 file systems ");

			let items = monitor.getItem().items
			this.props.dispatch(
				setAction(
					Actions.DataConverter.UPLOAD,
					{ items: items, subTree: this.props.self }
				)
			)

		} else {
			let item = monitor.getItem()
			console.log("                 sub files ");

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
		console.log("target",e.currentTarget)
		this.props.dispatch(
			setAction(
				Actions.Tree.CURRENT,
				this.props.self.index
			)
		)
		e.preventDefault();


	}

  render() {
   return (
    this.props.connectDragSource(this.props.connectDropTarget(
      <tr
        key={this.props.self.index.join("")}
        index={this.props.self.index}
        onClick={this.clicked}
        onDoubleClick={this.doubleClick}
      >

        <td>
          <span className={"file-tag-icon"}>
            <ImFolder />
          </span>
        </td>
        <td>{this.props.self.name.length > 20 ? this.props.self.name.substring(0, 20) + "..." : this.props.self.name}</td>
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