import React from 'react';
import './FileManager.scss';
import ActionsBar from '../actions-bar/ActionsBar';
import FileTag from '../file-tag/FileTag';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { Actions, setAction } from '../../redux/actions/Actions';
import FilesLayoutsViewBarr from '../files-layouts-view-barr/FilesLayoutsViewBarr';
import { Layout } from '../util/layout';

class FileManager_ extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      filterData: {
        isFirstCall: true,
        saveData: {}
      },
      layout: Layout.LIST
    }

    this.filtering = this.filtering.bind(this)
    this.SetLayout = this.SetLayout.bind(this)
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

  OnRemove = () => {
    this.props.dispatch(
      setAction(Actions.DataConverter.DELETE)
    )
  }

  OnDownload = () => {
    this.props.dispatch(
      setAction(Actions.DataConverter.DOWNLOAD)
    )
  }

  OnUpload = (e) => {
    this.props.dispatch(
      setAction(
        Actions.DataConverter.UPLOAD_File_Set,
        { items: e.target.files }
      )
    )
  }

  OnRename = () => {
    var newName = prompt("Please enter a new name");
    this.props.dispatch(
      setAction(Actions.DataConverter.RENAME, { newName: newName })
    )
  }

  OnCreate = () => {
    var name = prompt("Please enter the folder name");
    this.props.dispatch(
      setAction(Actions.DataConverter.CREATE, { name: name })
    )
  }

  LogOut = () => {
    this.props.dispatch(
      setAction(Actions.UserManager.USER.LOG_OUT.REMOTE)
    )
  }

  SetLayout = (n) => {
    console.log("FileM SetLayout",n)
    if (n <= 2 && n >= 0) {
      this.setState({ layout: n })
    }
  }

  componentDidMount() {
    this.props.dispatch(
      setAction(
        Actions.Tree.FETCH
      )
    )
  }

  render() { //TODO try multi backend
    let panel = () => {
      console.log("FM props.branch ",this.props.branch)
      console.log("FM props.fileTree ",this.props.fileTree)
        let element =((this.state.layout == Layout.TREE )? this.props.fileTree : (this.props.branch || this.props.fileTree));
        return <FileTag
          self={element}
          parent={null}
          key={this.props.fileTree.index.join("")}
          id={this.props.fileTree.index.join("")+this.props.fileTree.name}
          layout = {this.state.layout}

        />
    }

    return (
      <div>
        <ActionsBar filtering={this.filtering}
          OnDownload={this.OnDownload}
          OnUpload={this.OnUpload}
          OnRename={this.OnRename}
          OnRemove={this.OnRemove}
          OnCreate={this.OnCreate}
          LogOut={this.LogOut}
        />
        <FilesLayoutsViewBarr SetLayout={this.SetLayout} />
        <DndProvider backend={HTML5Backend}>
          <div className="App" >
            {panel()}
          </div>
        </DndProvider>
      </div>
    );
  }

};

const mapStateToProps = state => {
  return {
    fileTree: state.fileTree,
    branch: state.branch 
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
