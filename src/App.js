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

  constructor(props){
    super(props);
  }

  render() {
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
