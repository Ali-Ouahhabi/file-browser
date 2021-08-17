import React from 'react';
import './FilesLayoutsViewBarr.scss';
import { CgDisplayGrid, CgListTree } from "react-icons/cg";
import { ImList } from "react-icons/im";
import { Layout } from '../util/layout';


class FilesLayoutsViewBarr extends React.Component {

  constructor(props) {
    super(props);
    this.setLayout = this.setLayout.bind(this)
  }

  setLayout(e,n){
    e.preventDefault();
    this.props.SetLayout(n);
  }

  render() {

      return (
        <div className="FilesLayouts">

        <div className="menu-block" onClick={(e)=>this.setLayout(e,Layout.TREE)}>
          <span className="menu-icon">
            <CgListTree />
          </span>
        </div>
        <div className="menu-block" onClick={(e)=>this.setLayout(e,Layout.LIST)}>
          <span className="menu-icon">
            <ImList />
          </span>
        </div>
        <div className="menu-block" onClick={(e)=>this.setLayout(e,Layout.GRID)}>
          <span className="menu-icon">
            <CgDisplayGrid />
          </span>
        </div>
      </div>
      );
  }
}

export default FilesLayoutsViewBarr;
