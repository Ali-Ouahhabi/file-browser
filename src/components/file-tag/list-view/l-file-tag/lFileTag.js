import React from 'react';
import { ImFileText2 } from 'react-icons/im';
import { Actions, setAction } from '../../../../redux/actions/Actions';
import './lFileTag.scss';
import { DragSource, DropTarget } from "react-dnd";
import { NativeTypes } from 'react-dnd-html5-backend';
import { DragContent, DropCall } from '../../DnDUtil';

class LFileTag_ extends React.Component {
  
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

  render() {
    
    
    return (
      this.props.connectDragSource(
        <tr key={this.props.self.index.join("")}
          id={this.props.self.index.join("") + this.props.self.name}
          index={this.props.self.index}
          onClick={this.clicked}
          onDoubleClick={this.doubleClick}
        >
          <td>
            <span className={"file-tag-icon"}>
              <ImFileText2 />
            </span>
          </td>
          <td>{this.props.self.name.length > 20 ? this.props.self.name.substring(0, 20) + "..." : this.props.self.name}</td>
          <td>{this.getDate(this.props.self.meta.lastModified)}</td>
          <td>{this.props.self.meta.type.length > 20 ? this.props.self.meta.type.substring(0, 20) + "..." : this.props.self.meta.type}</td>
          <td>{this.bytesToSize(this.props.self.meta.size)}</td>
        </tr>
      ));
  }
}

const LFileTag = DragSource('FT', DragContent, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging()
}))(
	DropTarget(['FT', NativeTypes.FILE], DropCall, (connect, monitor) => ({
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver()
	}))(LFileTag_)
);


export default LFileTag;
