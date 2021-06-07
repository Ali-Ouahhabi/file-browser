import React from 'react';
import { connect } from 'react-redux';
import { Actions } from '../../redux/actions/Actions';
import './notifier.scss';
import { AiOutlineNotification } from "react-icons/ai";
import { BiErrorAlt } from "react-icons/bi";
import PuffLoader from "react-spinners/PuffLoader";

class Notifier_ extends React.Component {

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
  }

  hide() {
    this.myRef.current.style.display = 'none'
  }

  show() {
    this.myRef.current.style.display = 'block'
    setTimeout(this.hide,2000)
  }

  componentDidUpdate(){
    console.log("NOTIFIER!!!!!!!!!!!!!!!!")
    console.log(this.props.notification)
     this.show()
  }


  render() {
    let display;
    if (this.props.notification.message) {
      if (this.props.notification.type === Actions.ACTION.ERROR) {
        display = (
          <div className="notifier-error">
            <div className="icon"><BiErrorAlt /></div>
            <div className="text">{this.props.notification.message}</div>
          </div>
        )
      } else if (this.props.notification.type === Actions.ACTION.LOADING) {
        display = (<div className="notifier-loading">
          <div className="icon"> <PuffLoader></PuffLoader> </div>
          <div className="text">{this.props.notification.message}</div>
        </div>)
      } else if (this.props.notification.type === Actions.ACTION.SUCCESS) {
        display = (<div className="notifier-success">
          <div className="icon"><AiOutlineNotification /></div>
          <div className="text">{this.props.notification.message}</div>
        </div>)
      }

    }
  //   display = (<div className="notifier-loading">
  //   <div className="icon"> <PuffLoader></PuffLoader> </div>
  //   <div className="text">{"Loading something"}</div>
  // </div>);


    return (
      <div className="notifier-container" ref={this.myRef} onClick={this.hide}>
        <div className="notification">{display}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  };
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch: todo => dispatch(todo)
  };
}

const Notifier = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifier_);

export default Notifier;
