import React from "react";
import {
    Button,
    Container,
    Grid,
    Link,
    TextField,
} from "@material-ui/core";

class LogIn extends React.Component {
    constructor(props){
        super(props);
         this.handleChange = this.handleChange.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);
         this.state = {
            data:{
                email: "",
                password: ""
            },
            error:{
                email: {
                    is:false,
                    msg:"",
                    check:(state)=>{
                        if(/\S+@\S+\.\S+/.test(state.data.email))
                        this.setState({error:{...state.error,email:{...state.error.email,
                            is:false,
                            msg:""
                        }}})
                        else
                        this.setState({error:{...state.error,email:{...state.error.email,
                            is:true,
                            msg:"invalid email address"
                        }}})

                    }
                },
                password: {
                    is:false,
                    msg:"",
                    check:(state)=>{
                        if(state.data.password.length>=8)
                        this.setState({error:{...state.error,password:{...state.error.password,
                            is:false,
                            msg:""
                        }}})
                        else
                        this.setState({error:{...state.error,password:{...state.error.password,
                            is:true,
                            msg:"password should be at least 8 character"
                        }}})
                    }
                },
            }
        };
   }
 
     handleChange(event){
        this.setState((state,props)=>{
            return {...state, data:{ ...state.data, [event.target.name]: event.target.value }}
        },this.state.error[event.target.name].check(this.state))
     }
   
     handleSubmit(){
         if(this.state.data.password.length>=8&&/\S+@\S+\.\S+/.test(this.state.data.email))
         this.props.request(this.state.data);
     }

     render(){
         return(
            <Container component="main" maxWidth="xs">
            <div>
                <h1> Log In </h1>
                <h4 style={{color:"#f44336","text-align":"center",padding:"1px"}}>{this.props.error}</h4>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={this.handleChange}
                            value={this.state.data.email}
                            helperText={this.state.error.email.msg}
                            error={this.state.error.email.is}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={this.handleChange}
                            value={this.state.data.password}
                            helperText={this.state.error.password.msg}
                            error={this.state.error.password.is}
                        />
                    </Grid>
                </Grid>
                <Button
                    style={{
                        margin: "15px 0",
                        backgroundColor: "#001e35",
                        color: "white",
                        '&:hover': {
                            backgroundColor: "white",
                            color: "#001e35",
                        }
                    }}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="#001e35"
                    onClick={this.handleSubmit}
                >
                    Log In
                </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                        <Link href="#" variant="body2" onClick={this.props.revert}>
                            Don't have an account? Sign in
                         </Link>
                    </Grid>
                </Grid>
            </div>
        </Container>
         )
     }
}

export default LogIn;
