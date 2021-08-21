import React from 'react';
import './status.scss';
import PulseLoader from "react-spinners/PulseLoader"

class Status extends React.Component {

  render() {

    if(this.props.status == undefined) return "";

    if(this.props.status.state==='up')
    return <PulseLoader class="loader"></PulseLoader>
    if(this.props.status.state==='er')
    return <span class="errore" onClick={this.props.retry}>Error Retry?</span>
    else return '';
  }
}

export default Status;
