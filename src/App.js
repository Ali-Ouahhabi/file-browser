import './App.scss';
import React from 'react';
import FileManager from './components/file-manager/FileManager/FileManager';
import Register from "./components/user/register"

function App() {

  return (
    <div>
    <Register></Register>
     
    <FileManager></FileManager> 
    </div>
  );
}

export default App;
