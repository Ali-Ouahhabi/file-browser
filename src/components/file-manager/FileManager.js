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

    this.permute = this.permute.bind(this)
    this.filtering = this.filtering.bind(this)
  }

  setTreeV(v) {
    this.setState({ treeV: { ...v } })//TODO: should be replaced by dispatch refresh but until now it depend on the filtering functionality
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

  selected(index) {
    console.log("selected ", index)
  }

  componentDidMount(){
    this.props.dispatch(
      setAction(
        Actions.Tree.FETCH
      )
    )
  }

  render() {
    return (
      <div>
        <ActionsBar filtering={this.filtering}
          OnDownload={() => console.log("Download")}
          OnUpload={() => console.log("Upload")}
          OnRename={() => console.log("Rename")}
          OnRemove={() => console.log("Remove")}
        />

        <DndProvider backend={HTML5Backend}>
          <div className="App" >
            <FileTag
              self={this.props.fileTree}
              index={[]}
              selected={this.selected}
              path={"/" + this.props.fileTree.name}
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
