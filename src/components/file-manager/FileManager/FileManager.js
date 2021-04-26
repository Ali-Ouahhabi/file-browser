import React from 'react';
import './FileManager.scss';
import ActionsBar from '../../actions-bar/ActionsBar';
import FileTag from '../../file-tag/FileTag';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { Actions, setAction } from '../../../redux/actions/Actions';
import {SubTree} from '../../../redux/models/subTree';

class FileManager_ extends React.Component {

  constructor(props) {
    super(props);

    let tree = {
      parent: null,
      name: "root",
      isFile: false,
      children: [
        {
          name: "Document",
          isFile: false,
          children: [
            {
              name: "Music",
              isFile: false,
              children: [
                {
                  name: "music1.mp3",
                  isFile: true,
                  children: null
                },
                {
                  name: "music2.mp3",
                  isFile: true,
                  children: null
                },
                {
                  name: "music3.mp3",
                  isFile: true,
                  children: null
                }
              ]
            },
            {
              name: "Videos",
              isFile: false,
              children: [
                {
                  name: "vid1.mp4",
                  isFile: true,
                  children: null
                },
                {
                  name: "vid1.avi",
                  isFile: true,
                  children: null
                }
              ]
            },
            {
              name: "Pictures",
              isFile: false,
              children: [

              ]
            },

          ]
        },
        {
          name: "Download",
          isFile: false,
          children: [
            {
              name: "Programmes",
              isFile: false,
              children: [
                {
                  name: "VsCode.exe",
                  isFile: true,
                  children: null
                },
                {
                  name: "netbeans.exe",
                  isFile: true,
                  children: null
                }
              ]
            },
            {
              name: "Document",
              isFile: false,
              children: [
                {
                  name: "HelloWorld.pdf",
                  isFile: true,
                  children: null
                },
                {
                  name: "text.txt",
                  isFile: true,
                  children: null
                }
              ]
            },

          ]
        },

      ],
    }

    this.state = {
      treeV: { ...tree },
      filterData: {
        isFirstCall: true,
        saveData: {}
      }
    }

    this.permute = this.permute.bind(this)
    this.filtering = this.filtering.bind(this)
  }

  setTreeV(v) {
    this.setState({ treeV: { ...v } })//dispatch newtree for the moment 
  }
  setFilterData(FilterDataObject) {
    this.setState({ filterData: { ...FilterDataObject } })
  }


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

  permute(el, toIn) {

    let formData = new FormData();
    let jsonBodyData = [];

    let newTree = { ...this.props.fileTree }
    if (el instanceof DataTransferItemList) {
      // formedData(el, toIn)
      formData.append(
        'metadata',
        new Blob(
          [JSON.stringify(jsonBodyData)],
          { type: 'application/json' }
        )
      );
      this.props.dispatch(setAction(["FILE", "UPLOAD", "REMOTE"], formData));
      // addElAt(toIn, getFileStructure(el))
    } else if (el instanceof Array) {
      addElAt(toIn, getElAt(el))
      removeElAt(el)
    }
    this.setTreeV(newTree)


    function removeElAt(index) {
      let tmp = newTree
      let i = 0
      for (; i < index.length - 1; i++) {
        tmp = tmp.children[index[i]]
      }
      tmp.children = tmp.children.slice(0, index[i]).concat(tmp.children.slice(index[i] + 1))
    }

    function addElAt(index, el) {
      let tmp = newTree
      for (let i = 0; i < index.length; i++)
        tmp = tmp.children[index[i]]
      tmp.children = tmp.children.concat(el)
      return tmp
    }

    function getElAt(index) {
      let tmp = newTree
      let i = 0
      for (; i < index.length - 1; i++) {
        tmp = tmp.children[index[i]]
      }
      let child = tmp.children[index[i]]
      return child
    }



  }

  selected(index) {
    console.log("selected ", index)
  }

  render() {
    return (
      <div>
        <ActionsBar filtering={this.filtering}
          OnDownload={() => console.log("Download")}
          OnUpload={() => console.log("Upload")}
          OnRename={() => console.log("Rename")}
          OnRemove={() => console.log("Remove")}
        ></ActionsBar>
        <DndProvider backend={HTML5Backend}>
          <div className="App" >
            <FileTag
              self={this.props.fileTree}
              index={[]}
              selected={this.selected}
              reportChange={this.permute}
              path={"/" + this.props.fileTree.name}
            ></FileTag>
          </div>
        </DndProvider>
      </div>
    );
  }

};

const mapStateToProps = state => {
  console.log("mapping ", state)
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
