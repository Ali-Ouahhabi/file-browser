import React from 'react';
import { NativeTypes } from 'react-dnd-html5-backend';
import { Actions, setAction } from '../../../redux/actions/Actions';
import LFileTag from './l-file-tag/lFileTag';
import LFolderTag from './l-folder-tag/lFolderTag';
import { DropTarget } from "react-dnd";
import './listView.scss';
import { connect } from 'react-redux';



function ListViewChildren(props){
  if (props.children) {
    return props.children.map((child, index) => {
      if (child.isFile)
        return (
          <LFileTag 
            name={child.name}
            lastModified={child.meta.lastModified}
            type={child.meta.type}
            size={child.meta.size}
            self={child} 
            dispatch={props.dispatch}/>
          );
      else
        return (
          <LFolderTag self= {child} name={child.name} dispatch={props.dispatch}/>
         )
    });
  }else return'';

}

class ListView_ extends React.Component {

  // constructor(props) {
  //   super(props);
  // }

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
  
  render() {


    return this.props.connectDropTarget((
      <div className="rootListView">
        <table className="list-view-table">
          <thead>
            <tr>
              <th colspan="2">name</th>
              <th>lastModified</th>
              <th>type</th>
              <th>size</th>
            </tr>
          </thead>
          <tbody>
            <ListViewChildren children={this.props.self.children} dispatch={this.props.dispatch}/>
          </tbody>
        </table>
      </div>
    ))

  }
}

const dropCall = {
	drop(props, monitor, component) {
		if (component instanceof ListView_) {
			component.onDrop(props, monitor, component)
			return
		}
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
