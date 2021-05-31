import './App.scss';
import React from 'react';
import FileManager from './components/file-manager/FileManager';
import SignInUp from './components/user/signInUp';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { 
    connected: state.connected
  };
};

class App_ extends React.Component {

  render() {//TODO huge cleaning || a router with a menu for a home page login/register logout 
    let display = this.props.connected||localStorage.getItem("jwt")?<FileManager/>:<SignInUp/>
    return (
      <div>
        {display}
      </div>
    );
  }
}

const App = connect(
  mapStateToProps,
  null
)( App_);

export default App;
