import './App.scss';
import React from 'react';
import FileManager from './components/file-manager/FileManager/FileManager';
import Register from "./components/user/register"
import LogIn from './components/user/login';

function App() {

  return (
    <div>
    <LogIn/>
    <Register></Register>
     
    <FileManager></FileManager> 
    </div>
  );
}

export default App;
