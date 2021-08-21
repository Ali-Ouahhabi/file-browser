import React from 'react';
import './FilesLayoutsViewBarr.scss';
import { CgListTree } from "react-icons/cg";
import { BsGridFill } from "react-icons/bs"
import { ImList } from "react-icons/im";
import { Layout } from '../util/layout';
import { Actions, setAction } from '../../redux/actions/Actions';


class FilesLayoutsViewBarr extends React.Component {

  constructor(props) {
    super(props);
    this.setLayout = this.setLayout.bind(this)
    this.clicked = this.clicked.bind(this)
  }

  setLayout(e, n) {
    e.preventDefault();
    this.props.SetLayout(n);
  }

  clicked(e){
    let i = parseInt( e.currentTarget.getAttribute("index"));
    console.log("index read ",i)
    let p = this.props.index.slice(0,i);
    console.log("index requested ",p, "from", this.props.index)
    this.props.dispatch(
			setAction(
				Actions.Tree.CURRENT,
				p
			)
		)
  }

  render() {
    let item = (it, index) => [(<a onClick={this.clicked} index={index}>{it}</a>), (<div class="breadcrumb__separator">/</div>)]

    let breadCrumb = () => {
      if (this.props.breadCrumb)
        return (
          <div class="breadcrumb">
            {this.props.breadCrumb.split('/').filter(a=>a!="").map(item)}
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
