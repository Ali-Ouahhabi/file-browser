import React from 'react';
import { ImCloudUpload, ImCloudDownload, ImBin, ImFolder } from "react-icons/im";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { BiRename } from "react-icons/bi"
import './ActionsBar.scss';
import { connect } from 'react-redux';


class ActionsBar_ extends React.Component {

  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.OnUpload = this.OnUpload.bind(this)
  }

  OnUpload() {
    this.input.current.click()
  }

  render() {
    return (
      <div className="ActionsBar">
        <div className="gear">
          <div className="logout-block" onClick={this.props.LogOut}>
          <span className="logout-icon">
              <RiLogoutCircleRLine />
            </span>
            <span className="logout-title">
              logout
            </span>

          </div>
        </div>
        <div className="header">

          <div className="logo">
            <span>Some Logo</span>
          </div>

          <div className="menu">

            <div className="menu-block" onClick={this.props.OnDownload}>
              <span className="menu-icon">
                <ImCloudDownload />
              </span>
              <span className="menu-title">Download</span>
            </div>

            <div className="menu-block" onClick={this.OnUpload} >
              <span className="menu-icon">
                <ImCloudUpload />
                <input type="file" onChange={this.props.OnUpload} ref={this.input} style={{ display: "none" }} multiple /></span>
              <span className="menu-title">Upload</span>
            </div>

            <div className="menu-block" onClick={this.props.OnCreate}>
              <span className="menu-icon">
                <ImFolder /></span>
              <span className="menu-title">New</span>
            </div>

            <div className="menu-block" onClick={this.props.OnRename}>
              <span className="menu-icon">
                <BiRename /></span>
              <span className="menu-title">Rename</span>
            </div>

            <div className="menu-block" onClick={this.props.OnRemove}>
              <span className="menu-icon">
                <ImBin /></span>
              <span className="menu-title">Remove</span>
            </div>
          </div>

          <div className="search-container">
            <span className="search-label">Search</span>
            <input className="search-bare" type="text" name="filter" onChange={(e) => this.props.filtering(e.target.value)} />
          </div>

        </div>
      </div>);
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch: todo => dispatch(todo)
  };
}
const ActionsBar = connect(
  null,
  mapDispatchToProps
)(ActionsBar_);

export default ActionsBar;
