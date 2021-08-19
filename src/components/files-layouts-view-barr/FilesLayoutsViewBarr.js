import React from 'react';
import './FilesLayoutsViewBarr.scss';
import { CgListTree } from "react-icons/cg";
import { BsGridFill } from "react-icons/bs"
import { ImList } from "react-icons/im";
import { Layout } from '../util/layout';


class FilesLayoutsViewBarr extends React.Component {

  constructor(props) {
    super(props);
    this.setLayout = this.setLayout.bind(this)
  }

  setLayout(e, n) {
    e.preventDefault();
    this.props.SetLayout(n);
  }

  render() {
    let item = (it, index) => [(<a index={index}>{it}</a>), (<div class="breadcrumb__separator">/</div>)]

    let breadCrumb = () => {
      if (this.props.breadCrumb)
        return (
          <div class="breadcrumb">
            {this.props.breadCrumb.split('/').map(item)}
          </div>
        )
    }

    return (
      <div className="FilesLayouts">
        {breadCrumb()}
        <div className="menu-block" onClick={(e) => this.setLayout(e, Layout.TREE)}>
          <span className="menu-icon">
            <CgListTree />
          </span>
        </div>
        <div className="menu-block" onClick={(e) => this.setLayout(e, Layout.LIST)}>
          <span className="menu-icon">
            <ImList />
          </span>
        </div>
        <div className="menu-block" onClick={(e) => this.setLayout(e, Layout.GRID)}>
          <span className="menu-icon">
            <BsGridFill />
          </span>
        </div>
      </div>
    );
  }
}

export default FilesLayoutsViewBarr;
