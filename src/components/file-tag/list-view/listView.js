import React from 'react';
import { NativeTypes } from 'react-dnd-html5-backend';
import { Actions, setAction } from '../../../redux/actions/Actions';
import LFileTag from './l-file-tag/lFileTag';
import LFolderTag from './l-folder-tag/lFolderTag';
import { DragSource, DropTarget } from "react-dnd";


import './listView.scss';
import { DragContent, DropCall } from '../DnDUtil';
import { connect } from 'react-redux';

class ListView_ extends React.Component {

  constructor(props) {
    super(props);
  }

  onDrop(props, monitor, component) {

    console.log("list onDrop")

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
  
  render() {
    let children=()=> {
      let tmp = []
      if (this.props.self.children) {
        return this.props.self.children.map((child, index) => {
          child.index = this.props.self.index.concat(index);
          if (child.isFile)
            return (
              <LFileTag self={child} dispatch={this.props.dispatch}/>
              );
          else
            return (
              <LFolderTag self= {child} dispatch={this.props.dispatch}/>
             )
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
}

const dropCall = {
	drop(props, monitor, component) {
    console.log("list drop call ",component)
		if (component instanceof ListView_) {
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

const ListView__ = DropTarget(['FT', NativeTypes.FILE], dropCall, (connect, monitor) => ({
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver()
	}))(ListView_)


function mapDispatchToProps(dispatch) {
	return {
		dispatch: todo => dispatch(todo)
	};
}

const ListView = connect(
	null,
	mapDispatchToProps
)(ListView__);

export default ListView;
