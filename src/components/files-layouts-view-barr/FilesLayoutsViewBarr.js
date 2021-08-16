import React from 'react';
import './FilesLayoutsViewBarr.scss';
import { CgDisplayGrid, CgListTree } from "react-icons/cg";
import { ImList } from "react-icons/im";
//CgDisplayGrid, CgListTree, ImList 


class FilesLayoutsViewBarr extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

      return (
        <div className="FilesLayouts">
        <div className="menu-block" onClick={this.props.OnDownload}>
          <span className="menu-icon">
            <CgDisplayGrid />
          </span>
        </div>
        <div className="menu-block" onClick={this.props.OnDownload}>
          <span className="menu-icon">
            <CgListTree />
          </span>
        </div>
        <div className="menu-block" onClick={this.props.OnDownload}>
          <span className="menu-icon">
            <ImList />
          </span>
        </div>
      </div>
      );
  }
}

export default FilesLayoutsViewBarr;
