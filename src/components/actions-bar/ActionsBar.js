import React from 'react';
import { ImCloudUpload, ImCloudDownload, ImBin } from "react-icons/im";
import { BiRename } from "react-icons/bi"
import './ActionsBar.scss';

class ActionsBar extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="ActionsBar">
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

            <div className="menu-block" onClick={this.props.OnUpload}>
              <span className="menu-icon">
                <ImCloudUpload /></span>
              <span className="menu-title">Upload</span>
            </div>

            <div className="menu-block" onClick={this.props.OnRemove}>
              <span className="menu-icon">
                <ImBin /></span>
              <span className="menu-title">Remove</span>
            </div>

            <div className="menu-block" onClick={this.props.OnRename}>
              <span className="menu-icon">
                <BiRename /></span>
              <span className="menu-title">Rename</span>
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

ActionsBar.propTypes = {};

ActionsBar.defaultProps = {};

export default ActionsBar;
