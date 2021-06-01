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

const mapStateToProps = state => {
    return {
        signInUp: state.signInUp
    };
  };
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
        //TODO: add store props to access login and add an error display
        // ( two case redirected refresh token expires in login or duplicate email address register ) 
        let display = this.state.signInUp?<LogIn 
                                                request={this.request} 
                                                revert={this.signInUp}
                                                error = {this.props.signInUp.logIn.error}
                                                />
                                        :
                                        <Register 
                                        request={this.request} 
                                        revert={this.signInUp}
                                        error = {this.props.signInUp.register.error}
                                        />
        return (
            <div>{display}</div>
        )
    }
}

const SignInUp = connect(
    mapStateToProps,
    mapDispatchToProps
  )( SignInUp_);

export default SignInUp;