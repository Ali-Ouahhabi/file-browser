import React from 'react';
import { NativeTypes } from 'react-dnd-html5-backend';
import { ImFolder } from 'react-icons/im';
import { Actions, setAction } from '../../../../redux/actions/Actions';
import './GFolderTag.scss';
import { DragSource, DropTarget } from "react-dnd";
// import { DragContent, DropCall } from '../../DnDUtil';


class GFolderTag_ extends React.Component {
  
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
      <div className="grid-folder"
        onClick={this.clicked}
        onDoubleClick={this.doubleClick}>
        <span className={"file-tag-icon"}>
          <ImFolder />
        </span>
        <span className={"file-tag-title"}>{this.props.name.length > 11 ? this.props.name.substring(0, 11) + ".." : this.props.name}</span>

      </div>
		))
  );
    
  }
}
const dropCall = {
	drop(props, monitor, component) {
		if (component instanceof GFolderTag_) {
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

const GFolderTag = DragSource('FT', dragContent, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging()
}))(
	DropTarget(['FT', NativeTypes.FILE], dropCall, (connect, monitor) => ({
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver()
	}))(GFolderTag_)
);


export default GFolderTag;
