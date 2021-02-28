import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';
import FileTag from './components/FileTag';
import React, { useState } from 'react';

function App() {

  const tree = {
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

  let [treeV, setTreeV] = useState({ ...tree })
  let [filterData, setFilterData] = useState({
    isFirstCall: true,
    saveData: {}
  })
  function filtering(v) {
    if (filterData.isFirstCall) {
      setFilterData({
        isFirstCall: false,
        saveData: JSON.parse(JSON.stringify(treeV))
      })
    }

    if (!v) {
      setFilterData({
        isFirstCall: true,
      })
      setTreeV(filterData.saveData);
      return
    }

    let vv = { ...treeV, children: filterTree(treeV.children, v) }
    setTreeV(vv)

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

  function permute(el, toIn) {

    let newTree = { ...treeV }
    if (el instanceof DataTransferItemList) {
      addElAt(toIn, getFileStructure(el))
    } else if (el instanceof Array) {
      addElAt(toIn, getElAt(el))
      removeElAt(el)
    }
    setTreeV(newTree)

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

    function getFileStructure(items) {
      return Array.from(items).map(item => {
        if (item instanceof DataTransferItem) item = item.webkitGetAsEntry();
        if (item.isFile) {
          return {
            name: item.name,
            isFile: item.isFile,
            children: null
          }
        } else if (item.isDirectory) {
          //console.log("isDirectory >", item.name)
          let tmp = {
            name: item.name,
            isFile: item.isFile,
            children: []
          }
          // Get folder contents
          var dirReader = item.createReader();
          dirReader.readEntries((entries) =>
            tmp.children.push(
              ...getFileStructure(entries)
            )

          )
          return tmp;
        }
        else
          return [];
      })
    }
  }


  return (
    <div>
      <input type="text" name="filter" onChange={(e) => filtering(e.target.value)} />
      <DndProvider backend={HTML5Backend}>
        <div className="App" >
          <FileTag self={treeV} index={[]} reportChange={permute} path={"/" + tree.name}  ></FileTag>
        </div>
      </DndProvider>
    </div>
  );
}

export default App;
