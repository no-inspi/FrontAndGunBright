import React, { Component } from 'react';

import "../css/login.css";
import "../css/loginv2.css";

import { Link } from "react-router-dom";
import axios from 'axios';
import sha256 from 'crypto-js/sha256';

// material
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PasswordIcon from '@mui/icons-material/Password';

import Input from '@mui/material/Input';

import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

class SignUp extends Component {
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
            datejsobj: null,
            formEmail: '',
            firstName: '',
            lastName: '',
        };

    }

    componentDidMount() {
        const el = document.querySelector(".loader-container");
        if (el) {
            el.remove();
        }
    }

    signup = () => {
        const usernameSignup = this.state.username;
        const passwordSignup = this.state.password;
        const confirmPasswordSignup = this.state.confirmPassword;
        const firstName = this.state.firstName;
        const lastName = this.state.lastName;
        const email = this.state.formEmail;
        const dateobject = this.state.datejsobj;

        if (usernameSignup && (passwordSignup) && confirmPasswordSignup && firstName && lastName && email && dateobject) {
            if (passwordSignup == confirmPasswordSignup) {
                axios
                    .get("http://127.0.0.1:8000/create_user?username=" + usernameSignup + "&password=" + sha256(passwordSignup).toString())
                    .then(response => {
                        // console.log(response)
                        if (response.data.error) {
                            console.log(response.data.error)
                            this.alert.error(response.data.error)
                        }
                        else {
                            if (response.data.Status) {
                                console.log(response.data.Status)
                                this.alert.success('User correctly created ! Welcome ' + usernameSignup + ' !')
                                window.sessionStorage.setItem("username", usernameSignup)
                                window.location = "http://localhost:3000/"
                            }
                        }
                    })
            }
            else {
                this.alert.error('Passwords are not the same')
            }
        }
        else {
            this.alert.error('You need to fill all fields')
        }
    }

    onFirstNameChange = (event) => {
        //    this.state.username = event.target.value
        this.setState({ firstName: event.target.value });
    }

    onLastNameChange = (event) => {
        //    this.state.username = event.target.value
        this.setState({ lastName: event.target.value });
    }

    onUsernameChange = (event) => {
        //    this.state.username = event.target.value
        this.setState({ username: event.target.value });
    }

    onFormEmailChange = (event) => {
        //    this.state.username = event.target.value
        this.setState({ formEmail: event.target.value });
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
            // <div className="login-container">
            //     <div className='login-title'>
            //         <Link to="/">Bright</Link>
            //     </div>
            //     <div className="login-card">
            //         <h4>Registration</h4>
            //         <Box sx={{ display: 'flex', alignItems: 'center' }}>
            //             <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            //             <TextField id="outlined-basic" size="small" label="Username" variant="outlined" color="primary" sx={{
            //                 width: 'auto',
            //                 maxWidth: 200,
            //                 '& .MuiOutlinedInput-notchedOutline': {
            //                     borderRadius: "5px"
            //                 },
            //                 '& .MuiInputBase-root': {
            //                     borderRadius: "5px"
            //                 }
            //             }}
            //                 onChange={this.onUsernameChange}
            //             />
            //         </Box>
            //         <Box sx={{ display: 'flex', alignItems: 'center', mt: '20px' }}>
            //             <PasswordIcon sx={{ color: 'action.active', my: 0.5, mr: 1 }} />
            //             <TextField id="outlined-basic" size="small" label="Password" variant="outlined" color="primary" type="password" sx={{
            //                 width: 'auto',
            //                 maxWidth: 200,
            //                 '& .MuiOutlinedInput-notchedOutline': {
            //                     borderRadius: "5px"
            //                 },
            //                 '& .MuiInputBase-root': {
            //                     borderRadius: "5px"
            //                 }
            //             }}
            //                 onChange={this.onPasswordChange}
            //             />
            //         </Box>
            //         <Box sx={{ display: 'flex', alignItems: 'center', mt: '20px' }}>
            //             <PasswordIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            //             <TextField id="PasswordConfirmation" size="small" label="Confirm Password" variant="outlined" color="primary" type="password" sx={{
            //                 width: 'auto',
            //                 maxWidth: 200,
            //                 '& .MuiOutlinedInput-notchedOutline': {
            //                     borderRadius: "5px"
            //                 },
            //                 '& .MuiInputBase-root': {
            //                     borderRadius: "5px"
            //                 }
            //             }}
            //                 onChange={this.onPasswordConfirmChange}
            //             />
            //         </Box>

            //         <Button variant="contained" sx={{
            //             color: 'white',
            //             width: "100%",
            //             maxWidth: "auto",
            //             backgroundColor: '#6c5ffc',
            //             mt: '2rem',
            //             borderRadius: 2,
            //             textTransform: 'none',

            //         }}
            //             onClick={this.signup}
            //         >
            //             Sign up
            //         </Button>
            //         <Box sx={{ textAlign: 'center', width: '100%', marginTop: '10px' }}>
            //             <Link to="/login" style={{ color: "#6c5ffc" }}>Already have an account ?</Link>
            //         </Box>
            //     </div>
            // </div>
            <div className="signup-container">
                <div className='loginv2_container'>
                    <div className='loginv2_subcontainer'>
                        <div className='loginv2_title'>
                            <span className='title_braight'>Braight</span>
                            <span className='desc_braight'>Le réseau social de l'influence anonyme</span>
                        </div>
                        <div className='loginv2_card_container'>
                            <div className='button_container'>
                                <Link to="/login">
                                    <button className='login_button button_border_white'>Sign in</button>
                                </Link>
                                <button className='login_button button_white'>Create an account</button>

                            </div>
                            <div className='input_container'>
                                <Input
                                    placeholder="First name"
                                    sx={{
                                        color: 'white',
                                        ':before': { borderBottomColor: 'white' }
                                    }}
                                    color="primary"
                                    onChange={this.onFirstNameChange}
                                />
                                <Input
                                    placeholder="Last name"
                                    sx={{
                                        color: 'white',
                                        ':before': { borderBottomColor: 'white' }
                                    }}
                                    color="primary"
                                    onChange={this.onLastNameChange}
                                />
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        value={this.state.datejsobj}
                                        onChange={(newValue) => {
                                            this.setState({ datejsobj: newValue });
                                            // setValue(newValue);
                                        }}
                                        renderInput={(params) => <Input
                                            sx={{
                                                color: 'white',
                                                ':before': { borderBottomColor: 'white' }
                                            }}
                                            color="primary"
                                            {...params}
                                            inputProps={{
                                                ...params.inputprops,
                                                placeholder: "Your birth date (mm/dd/yyyy)"
                                            }}
                                        />}
                                    />
                                </LocalizationProvider>
                                <Input
                                    placeholder="Username"
                                    sx={{
                                        color: 'white',
                                        ':before': { borderBottomColor: 'white' }
                                    }}
                                    color="primary"
                                    type="text"
                                    onChange={this.onUsernameChange}
                                />
                                <Input
                                    placeholder="Email Address"
                                    sx={{
                                        color: 'white',
                                        ':before': { borderBottomColor: 'white' }
                                    }}
                                    color="primary"
                                    type="email"
                                    onChange={this.onFormEmailChange}
                                />
                                <Input
                                    placeholder="Password"
                                    sx={{
                                        color: 'white',
                                        ':before': { borderBottomColor: 'white' }
                                    }}
                                    color="primary"
                                    type="password"
                                    onChange={this.onPasswordChange}
                                />
                                <Input
                                    placeholder="Confirm Password"
                                    sx={{
                                        color: 'white',
                                        ':before': { borderBottomColor: 'white' }
                                    }}
                                    color="primary"
                                    type="password"
                                    onChange={this.onPasswordConfirmChange}
                                />

                            </div>
                            <div className=''>
                                <button className='login_button button_white gotobraight_button' onClick={this.signup}> Enter Braight </button>
                            </div>
                        </div>
                        <div> </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUp;