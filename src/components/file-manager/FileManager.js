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
import SubTreeHelper from '../../redux/models/subTreeHelper';
import gridView from '../file-tag/grid-view/gridView';
import listView from '../file-tag/list-view/listView';
import GridView from '../file-tag/grid-view/gridView';
import ListView from '../file-tag/list-view/listView';


//TODO: we have selected branche and displayed or curent branch
// in the init state the root brache is the curent branch the selected branch is also the root 
// at curenet branch on subtree
// the selected branch can only be the sub of the sub tree so??
// you define curenet and selected branch whe nothin is selected point to the curent by default
// also at init the root branch is the curent view.
// need also to defin a pointer to the structure to check if ther is already a curent branch pointed to it !!!!
class FileManager_ extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      filterData: {
        isFirstCall: true,
        saveData: {}
      },
      layout: Layout.GRID
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
    console.log("DID MOUNT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1")
    this.props.dispatch(
      setAction(
        Actions.Tree.FETCH
      )
    )
  }

  render() { //TODO try multi backend
    console.log("FM index",this.props.branch.index);
    console.log("FM tree",this.props.fileTree);
    let subtree = SubTreeHelper.getSubtreeAt(this.props.fileTree,this.props.branch.index);
     console.log("FM ",subtree,"display ",this.state.layout)
    if(subtree == undefined) return "";
    console.log("..still")
    let panel = () => {
      console.log("panelFM ",subtree,"display ",this.state.layout)

      if(this.state.layout == Layout.GRID)
        {console.log(Layout.GRID);
        return (<GridView self={subtree}/>);}
      else if(this.state.layout == Layout.LIST){
        return (<ListView self={subtree}/>);
      }else if(this.state.layout==Layout.TREE){
        return (<FileTag
        self={subtree}
        parent={null}
        key={this.props.fileTree.index.join("")}
        id={this.props.fileTree.index.join("")+this.props.fileTree.name}
        layout = {this.state.layout}
      />)
      }
    }

    console.log("panel<<<--",panel())
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
        <FilesLayoutsViewBarr SetLayout={this.SetLayout} breadCrumb={subtree.path} index = {subtree.index} dispatch={this.props.dispatch}/>
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
