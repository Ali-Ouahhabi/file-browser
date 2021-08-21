import React from 'react';
import { ImFileText2, ImFolder } from 'react-icons/im';
import { Actions, setAction } from '../../../../redux/actions/Actions';
import GFolderTag from '../g-folder-tag/GFolderTag';
import './GFileTag.scss';
import { DragSource, DropTarget } from "react-dnd";
import { DragContent, DropCall } from '../../DnDUtil';
import { NativeTypes } from 'react-dnd-html5-backend';


class GFileTag_ extends React.Component {
  
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

			return this.props.parent.onDrop(props, monitor, component)

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
      this.props.connectDragSource(
        <div className="grid-file"
          index={this.props.self.index}
          onClick={this.clicked}
          onDoubleClick={this.doubleClick}>
          <span className={"file-tag-icon"}>
            <ImFileText2 />
          </span>
          <span className={"file-tag-title"}>{this.props.self.name.length > 11 ? this.props.self.name.substring(0, 11) + ".." : this.props.self.name}</span>
        </div>
      ));
  }
}

const dropCall = {
	drop(props, monitor, component) {
		if (component instanceof GFileTag) {
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

const GFileTag = DragSource('FT', dragContent, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging()
}))(
	DropTarget(['FT', NativeTypes.FILE], dropCall, (connect, monitor) => ({
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver()
	}))(GFileTag_)
);


export {GFileTag,GFileTag_};
