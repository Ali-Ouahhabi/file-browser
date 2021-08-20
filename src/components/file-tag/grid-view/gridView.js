import React from 'react';
import { NativeTypes } from 'react-dnd-html5-backend';
import { Actions, setAction } from '../../../redux/actions/Actions';
import GFileTag from './g-file-tag/GFileTag';
import GFolderTag from './g-folder-tag/GFolderTag';
import { DragSource, DropTarget } from "react-dnd";

import './gridView.scss';
import { DragContent, DropCall } from '../DnDUtil';
import { connect } from 'react-redux';

class GridView_ extends React.Component {

constructor(props) {
    super(props);

    console.log("GRIDE VIEW CONSTRUCT rpops.",props)

  }

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

			if (this.props.self.children[item.index[item.index.length - 1]] === item) return;
			this.props.dispatch(
				setAction(
					Actions.FileManager.FOLDER.MOVE.REMOTE,
					{ from: item, to: this.props.self }
				)
			)
		}

	}

  render() {
    let renderChildGridView=()=> {
      console.log("GRIDE VIEW ",this.props.self)
      let children = () => {
        let tmp = []
        if (this.props.self.children) {
          return this.props.self.children.map((child, index) => {
            child.path = this.props.self.path + "/" + child.name
            child.index = this.props.self.index.concat(index);
            if (child.isFile)
              return  (<GFileTag self={child} dispatch={this.props.dispatch}/>);
            else
              return (<GFolderTag self={child}dispatch={this.props.dispatch}/>);
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
   return renderChildGridView();
  }
}

const GridView__ = DragSource('FT', DragContent, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging()
}))(
	DropTarget(['FT', NativeTypes.FILE], DropCall, (connect, monitor) => ({
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
