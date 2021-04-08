import React from "react";
import LogIn from "./login";
import Register from "./register";
import {User} from "../../redux/request";
import { Actions, setAction } from "../../redux/Actions"
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
        let request_ = this.state.signInUp?User.userSignIn:User.userRegister;
        // let action = this.state.signInUp?Actions.UserManager.USER.SIGN_IN.REMOTE
        let path = this.state.signInUp?Actions.ACTION.SIGN_IN:Actions.ACTION.REGISTER
        let action = Actions.UserManager.USER[path].REMOTE
        this.props.dispatch(setAction(action,user));
        // request_(user)
        // .then(e=>console.log("then -> ",e.data.jwt))
        // .catch(e=>console.log("then -> ",e));
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