import React from "react";
import LogIn from "./login";
import Register from "./register";
import { Actions, setAction } from "../../redux/actions/Actions"
import { connect } from "react-redux";
function mapDispatchToProps(dispatch) {
    return {
      dispatch: todo => dispatch(todo)
    };
  }
  
class SignInUp_ extends React.Component {

    constructor(props){
        super(props);
        this.state={signInUp:true};
        this.signInUp = this.signInUp.bind(this);
        this.request = this.request.bind(this); 
    }

    signInUp(){
        this.setState({signInUp:!this.state.signInUp})
    }

    request(user){
        let path = this.state.signInUp?Actions.ACTION.SIGN_IN:Actions.ACTION.REGISTER
        let action = Actions.UserManager.USER[path].REMOTE
        this.props.dispatch(setAction(action,user));
    }

    render(){
        let display = this.state.signInUp?<LogIn request={this.request} revert={this.signInUp}/>:<Register request={this.request} revert={this.signInUp}/>
        return (
            <div>{display}</div>
        )
    }
}

const SignInUp = connect(
    null,
    mapDispatchToProps
  )( SignInUp_);

export default SignInUp;