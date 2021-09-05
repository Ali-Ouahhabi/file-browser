import React from 'react';
import { ImFileText2 } from 'react-icons/im';
import { Actions, setAction } from '../../../../redux/actions/Actions';
import './GFileTag.scss';
import { DragSource, DropTarget } from "react-dnd";
import { NativeTypes } from 'react-dnd-html5-backend';


class GFileTag_ extends React.Component {
  
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
      this.props.connectDragSource(
        <div className="grid-file"
          onClick={this.clicked}
          onDoubleClick={this.doubleClick}>
          <span className={"file-tag-icon"}>
            <ImFileText2 />
          </span>
          <span className={"file-tag-title"}>{this.props.name.length > 11 ? this.props.name.substring(0, 11) + ".." : this.props.name}</span>
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
