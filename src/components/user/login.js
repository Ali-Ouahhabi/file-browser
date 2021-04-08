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
         email:"",
         password:""
         }
   }
 
     handleChange(event){
         this.setState({
         [event.target.name]: event.target.value
         });
     }
   
     handleSubmit(){
         this.props.request(this.state);
     }

     render(){
         return(
            <Container component="main" maxWidth="xs">
            <div>
                <h1> Log In </h1>
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
                            value={this.state.email}
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
                            value={this.state.password}
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
