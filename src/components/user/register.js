import React from "react";
import {
    Button,
    Container,
    Grid,
    Link,
    TextField,
} from "@material-ui/core";


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        };
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit() {
        console.log("vals ", this.state);
        // signup(this.state).then((e)=>{

        //   console.log(" signed up returned ",e)

        // }).catch((er) =>{
        //   console.log(" Error signing up ", er);
        // })
    }

    render() {
        return (
            <Container component="main" maxWidth="xs">
                <div>
                    <h1> Sign up </h1>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                onChange={this.handleChange}
                                value={this.state.firstName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                onChange={this.handleChange}
                                value={this.state.lastName}
                            />
                        </Grid>
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
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2" onClick={this.props.login}>
                                Already have an account? Sign in
                             </Link>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        );
    }
}

export default Register;
