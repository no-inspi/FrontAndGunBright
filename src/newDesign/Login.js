import React, { Component } from 'react';

import "../css/login.css";

import axios from 'axios'

import { Link } from "react-router-dom";
import { Navigate } from 'react-router-dom';

// material
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PasswordIcon from '@mui/icons-material/Password';

import sha256 from 'crypto-js/sha256';


class Login extends Component {
    constructor({ gun, alert }) {
        super()

        this.gun = gun;
        this.userG = gun.user().recall({ sessionStorage: true })
        this.alert = alert;

        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            usernameTamp: "",
            userGunObject: "",
            connected: false,
        };

    }

    componentDidMount() {
        const el = document.querySelector(".loader-container");
        if (el) {
            el.remove();
        }
        if (this.userG.is && window.sessionStorage.getItem('username')) {
            this.setState({ connected: true });
        }
    }

    signin = () => {

        const usernameTampSignIn = this.state.username
        if (this.state.username && this.state.password) {
            //Id : charlietest password1234567890
            axios
                .get("http://127.0.0.1:8000/get_user_pass?username="+usernameTampSignIn+"&password="+sha256(this.state.password).toString())
                .then(response => {
                    console.log(response.data)
                    if (response.data.error) {
                        console.log(response.data.error)
                        this.alert.error(response.data.error)
                    }
                    else {
                        if (response.data.username) {
                            console.log(response.data.username)
                            this.alert.success('User correctly connected ! Welcome ' + response.data.username + ' !')
                            window.sessionStorage.setItem("username", response.data.username)
                            window.location = "http://localhost:3000/"
                        }
                    }
                })

            // this.userG.auth(this.state.username, this.state.password, function (at) {
            //     if (at.err) {
            //         self.alert.error(at.err)
            //     }
            //     else if (at.id) {
            //         self.alert.success('User correctly connected')
            //         // this.state.connected = true
            //         // console.log("test in sign in ",usernameTampSignIn)
            //         console.log("SignIn UserGunObject")
            //         var gunUserObject = self.gun.get('users').get(usernameTampSignIn)
            //         console.log(gunUserObject)
            //         // self.props.setConnectedFromChild(true)
            //         // self.props.setUsernameTampFromChild(usernameTampSignIn)
            //         // self.props.setuserGunObjectFromChild(gunUserObject)
            //         // self.setState({ connected: true,usernameTamp: usernameTampSignIn, userGunObject : gunUserObject})
            //         // self.forceUpdate();
            //         window.sessionStorage.setItem("username", usernameTampSignIn)
            //         // window.location.reload()
            //         window.location = "http://localhost:3000/post"
            //     }
            // })
        }
    }

    onUsernameChange = (event) => {
        //    this.state.username = event.target.value
        this.setState({ username: event.target.value });
    }

    onPasswordChange = (event) => {
        // this.state.password = event.target.value
        this.setState({ password: event.target.value });
    }

    onPasswordConfirmChange = (event) => {
        // this.state.password = event.target.value
        this.setState({ confirmPassword: event.target.value });
    }
    render() {
        return (

            <div className="login-container">
                {window.sessionStorage.getItem('username') ? (
                    <div>
                        Wow, what are you doing here ?? <Link to="/" style={{ color: "white" }}>Go Home</Link>

                    </div>
                ) : (
                    <div>
                        <div className='login-title'>
                            <Link to="/">Bright</Link>
                        </div>
                        <div className="login-card">
                            <h4>Login</h4>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField id="outlined-basic" size="small" label="Username" variant="outlined" color="primary" sx={{
                                    width: 'auto',
                                    maxWidth: 200,
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderRadius: "5px"
                                    },
                                    '& .MuiInputBase-root': {
                                        borderRadius: "5px"
                                    }
                                }}
                                    onChange={this.onUsernameChange}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                                <VisibilityIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField id="outlined-basic" size="small" label="Password" variant="outlined" color="primary" type="password" sx={{
                                    width: 'auto',
                                    maxWidth: 200,
                                    // mt: '20px',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderRadius: "5px"
                                    },
                                    '& .MuiInputBase-root': {
                                        borderRadius: "5px"
                                    }
                                }}
                                    onChange={this.onPasswordChange}
                                />
                            </Box>
                            <Box sx={{ textAlign: 'right', width: '100%', marginTop: '10px' }}>
                                <Link to="/" style={{ color: "#6c5ffc" }}>Forgot password ?</Link>
                            </Box>
                            <Button variant="contained" sx={{
                                color: 'white',
                                width: "100%",
                                maxWidth: "auto",
                                backgroundColor: '#6c5ffc',
                                mt: '1rem',
                                borderRadius: 2,
                                textTransform: 'none',

                            }}
                                onClick={this.signin}
                            >
                                Login
                            </Button>
                            <Box sx={{ textAlign: 'center', width: '100%', marginTop: '10px' }}>
                                <Link to="/signup" style={{ color: "#6c5ffc" }}>Create an account !</Link>
                            </Box>
                        </div>
                    </div>
                )}
            </div>

        )
    }
}

export default Login;