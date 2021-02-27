import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';
import FileTag from './components/FileTag';

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

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App" >
        <FileTag self={tree} path={"/"+tree.name}></FileTag>
      </div>
    </DndProvider>

  );
}

export default App;
