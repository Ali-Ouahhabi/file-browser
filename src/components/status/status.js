import React from 'react';
import './status.css';

class status extends React.Component {

constructor(props) {
    super(props);
  }

  render() {
    if(this.props.status.state=='up')
    return <span class="loader"></span>
    if(this.props.status.state=='er')
    return <span class="errore" onClick={this.props.retry}>Error Retry?</span>
    else return '';
  }
}

export default status;
