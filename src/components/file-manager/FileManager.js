import React from 'react';
import './FileManager.scss';
import ActionsBar from '../actions-bar/ActionsBar';
import FileTag from '../file-tag/FileTag';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { Actions, setAction } from '../../redux/actions/Actions';

class FileManager_ extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      filterData: {
        isFirstCall: true,
        saveData: {}
      }
    }

    this.filtering = this.filtering.bind(this)
  }

  setTreeV(v) {
    this.setState({ treeV: { ...v } })
  }
  setFilterData(FilterDataObject) {
    this.setState({ filterData: { ...FilterDataObject } })
  }

//TODO: adjust 
  filtering(v) {
    if (this.state.filterData.isFirstCall) {
      this.setFilterData({
        isFirstCall: false,
        saveData: JSON.parse(JSON.stringify(this.props.fileTree))
      })
    }

    if (!v) {
      this.setFilterData({
        isFirstCall: true,
      })
      this.setTreeV(this.state.filterData.saveData);
      return
    }

    let vv = { ...this.props.fileTree, children: filterTree(this.props.fileTree.children, v) }
    this.setTreeV(vv)

    function filterTree(ch, val) {
      val = val.toLocaleLowerCase()
      if (!ch instanceof Array)
        return null

      return ch.reduce((acc, el) => {
        if (el.isFile && el.name.toLocaleLowerCase().startsWith(val)) {
          acc.push({ ...el })
          return acc;
        }
        else if (!el.isFile) {
          let nch = filterTree(el.children, val)
          let nel = { ...el };
          nel.children = nch
          if (nch.length || el.name.toLocaleLowerCase().startsWith(val))
            acc.push({ ...el, children: nch })
          return acc;
        }
        return acc;
      }, [])
    }
  }

  OnRemove = ()=>{
    this.props.dispatch(
      setAction(Actions.DataConverter.DELETE)
    )
  }

  OnDownload = ()=>{
    this.props.dispatch(
      setAction(Actions.DataConverter.DOWNLOAD)
    )
  }

  OnUpload = (e)=>{
    this.props.dispatch(
      setAction(
        Actions.DataConverter.UPLOAD_File_Set,
        { items: e.target.files}
      )
    )
  }

  OnRename = () => {
    var newName = prompt("Please enter a new name");
    this.props.dispatch(
      setAction(Actions.DataConverter.RENAME,{newName:newName})
    )
  }
  
  OnCreate = () => {
    var name = prompt("Please enter the folder name");
    this.props.dispatch(
      setAction(Actions.DataConverter.CREATE,{name:name})
    )
  }

  componentDidMount(){
    this.props.dispatch(
      setAction(
        Actions.Tree.FETCH
      )
    )
  }

  render() { //TODO try multi backend
    let view = {selected:false}
    return (
      <div>
        <ActionsBar filtering={this.filtering}
          OnDownload={this.OnDownload}
          OnUpload={this.OnUpload}
          OnRename={this.OnRename}
          OnRemove={this.OnRemove}
          OnCreate={this.OnCreate}
        />

        <DndProvider backend={HTML5Backend}>
          <div className="App" >
            <FileTag
              self={this.props.fileTree}
              index={[]}
              path={"/" + this.props.fileTree.name}
              view={view}
            />
          </div>
        </DndProvider>
      </div>
    );
  }

};

const mapStateToProps = state => {
  return {
    fileTree: state.fileTree
  };
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch: todo => dispatch(todo)
  };
}
const FileManager = connect(
  mapStateToProps,
  mapDispatchToProps
)(FileManager_);

export default FileManager;
