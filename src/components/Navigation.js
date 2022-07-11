import React, { Component } from 'react';

// icons
import { FaBeer, FaEthereum, FaBitcoin,FaLeaf,FaFire,FaCopyright } from 'react-icons/fa';
import { AiFillLike, AiFillDislike, AiOutlineComment, AiFillCar,AiFillBank } from 'react-icons/ai';
import { SiHiveBlockchain } from 'react-icons/si';
import { GiShinyPurse } from 'react-icons/gi';
import {BsPeopleFill,BsDiscord,BsLinkedin} from 'react-icons/bs';
import {MdSendToMobile} from 'react-icons/md';
import {HiFire} from 'react-icons/hi';

// material
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// icons material
import SearchIcon from '@mui/icons-material/Search';
import DoneAllIcon from '@mui/icons-material/DoneAll';

import favicon from '../images/favicon.png';

import axios from 'axios';

class Navigation extends Component {

    constructor({gun,alert}) {
        super()

        this.gun = gun;
        this.userG = gun.user().recall({ sessionStorage: true })
        this.alert = alert;


        this.state = { 
            username: '', 
            password: '', 
            confirmPassword: '', 
            SignIn: true, 
            usernameTamp: "",
            userGunObject : "",  
        };
        
    }

    signup = () => {
        const usernameSignup = this.state.username;
        const passwordSignup = this.state.password;
        const confirmPasswordSignup = this.state.confirmPassword;
        const self = this;

        if (this.state.username && this.state.password && this.state.confirmPassword) {
            // console.log("singup test:",this.state.username,this.state.password,this.state.confirmPassword)
            if (passwordSignup!=confirmPasswordSignup) {
                this.alert.error('Passwords are not the same, please retry')
            } else {
                var userInfo = {
                    username: usernameSignup
                };
        
                var user = this.gun.get('users').get(userInfo.username).put(userInfo);

                this.userG.create(usernameSignup, passwordSignup, function (ack) {
                    // console.log(ack)
                    if (ack.err) {
                        self.alert.error(ack.err)
                    }
                    else {
                        axios
                        .get("http://127.0.0.1:8000/create_user?username=" + usernameSignup)
                        .then(response => 
                           console.log(response)
                        );
                        self.alert.success('User correctly created ! Welcome '+usernameSignup+' !')
                        self.setState({username :'',password: '', confirmPassword: ''})
                    }
                })
            }
            
            
        }
    }

    signin = () => {
        const self = this
        const usernameTampSignIn = this.state.username
        if (this.state.username && this.state.password) {
            //Id : charlietest password1234567890

            this.userG.auth(this.state.username, this.state.password, function (at) {
                if (at.err) {
                    self.alert.error(at.err)
                }
                else if (at.id) {
                    self.alert.success('User correctly connected')
                    // this.state.connected = true
                    // console.log("test in sign in ",usernameTampSignIn)
                    console.log("SignIn UserGunObject")
                    var gunUserObject = self.gun.get('users').get(usernameTampSignIn)
                    console.log(gunUserObject)
                    self.props.setConnectedFromChild(true)
                    self.props.setUsernameTampFromChild(usernameTampSignIn)
                    self.props.setuserGunObjectFromChild(gunUserObject)
                    // self.setState({ connected: true,usernameTamp: usernameTampSignIn, userGunObject : gunUserObject})
                    self.forceUpdate();
                    window.sessionStorage.setItem("username", usernameTampSignIn)
                    window.location.reload()
                }
            })
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

    render () {
        return(
            <div className='navigation'>
                    <div className='navigation__title'>

                        <img src={favicon} />
                        <span className='navigation__title__content'>Bright {this.props.connected} </span>
                        <span className='navigation__title__secondary'>New generation social network</span>
                        {this.props.connected ? 
                        <div className='navigation__card__login'>
                            <div className="navigation__card__stats">
                                <h3>Social network stats</h3>
                                <div>
                                   <BsPeopleFill /> Users : 5246
                                </div>
                                <div>
                                    <MdSendToMobile/> Posts (24H) : 1528
                                </div>
                                <div>
                                    <MdSendToMobile/> Posts (From start) : 62 923
                                </div>
                            </div>
                        </div>

                            :
                            <div>

                                {this.state.SignIn ?
                                    <div className='navigation__card__login'>
                                        <h4>Login</h4>
                                        <TextField id="outlined-basic" size="small" label="Username" variant="outlined" color="success" sx={{
                                            width: 'auto',
                                            maxWidth: 200,
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderRadius: "150px"
                                            },
                                            '& .MuiInputBase-root': {
                                                borderRadius: "150px"
                                            }
                                        }} 
                                        onChange={this.onUsernameChange}
                                        />
                                        <TextField id="outlined-basic" size="small" label="Password" variant="outlined" color="success" type="password" sx={{
                                            width: 'auto',
                                            maxWidth: 200,
                                            mt: '10px',
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderRadius: "150px"
                                            },
                                            '& .MuiInputBase-root': {
                                                borderRadius: "150px"
                                            }
                                        }} 
                                        onChange={this.onPasswordChange}
                                        />
                                        <Button variant="contained" sx={{
                                            color: 'white',
                                            width: 150,
                                            maxWidth: 150,
                                            backgroundColor: '#20B95F',
                                            mt: '0.75rem',
                                            borderRadius: 50,
                                            
                                        }}
                                        onClick={this.signin}
                                        >
                                            Log In
                                        </Button><br></br>
                                        <Button variant="text" sx={{ mt: "0.50rem", color: "#1d8cf8", letterSpacing: "0.5px" }}
                                            onClick={() => {
                                                this.setState({ SignIn: !this.state.SignIn })
                                            }}>
                                            Join !
                                        </Button>
                                    </div>
                                    :
                                    <div className='navigation__card__login'>
                                        <h4>Join us !</h4>
                                        <TextField id="outlined-basic" size="small" label="Username" variant="outlined" color="success" sx={{
                                            width: 'auto',
                                            maxWidth: 200,
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderRadius: "150px"
                                            },
                                            '& .MuiInputBase-root': {
                                                borderRadius: "150px"
                                            }
                                        }} 
                                        onChange={this.onUsernameChange}
                                        />
                                        <TextField id="Password" size="small" label="Password" variant="outlined" color="success" type="password" sx={{
                                            width: 'auto',
                                            maxWidth: 200,
                                            mt: '10px',
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderRadius: "150px"
                                            },
                                            '& .MuiInputBase-root': {
                                                borderRadius: "150px"
                                            }
                                        }} 
                                        onChange={this.onPasswordChange}
                                        />
                                        <TextField id="PasswordConfirmation" size="small" label="Confirm Password" variant="outlined" color="success" type="password" sx={{
                                            width: 'auto',
                                            maxWidth: 200,
                                            mt: '10px',
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderRadius: "150px"
                                            },
                                            '& .MuiInputBase-root': {
                                                borderRadius: "150px"
                                            }
                                        }} 
                                        onChange={this.onPasswordConfirmChange}
                                        />
                                        <Button variant="contained" sx={{
                                            color: 'white',
                                            width: 150,
                                            maxWidth: 150,
                                            backgroundColor: '#20B95F',
                                            mt: '0.75rem',
                                            borderRadius: 50,
                                        }}
                                        onClick={this.signup}
                                        >
                                            Join <DoneAllIcon className="ml-1" />
                                        </Button>
                                        <Button variant="text" sx={{ mt: "0.50rem", color: "#1d8cf8", letterSpacing: "0.5px" }}
                                            onClick={() => {
                                                this.setState({ SignIn: !this.state.SignIn })
                                            }}>
                                            Log in !
                                        </Button>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                    <div className='navigation__links grid grid-cols-2 gap-4'>
                        <div className='category__title'>
                            Top categories
                        </div>
                        <div className='category__title'>
                            Fire categories
                        </div>
                        <div className='category__card'>
                            <div>
                                <FaEthereum />
                            </div>
                            <span>Crypto</span>
                        </div>
                        <div className='category__card'>
                            <div><AiFillCar /></div>
                            <span>Car</span>
                        </div>
                        <div className='category__card'>
                            <div><SiHiveBlockchain /></div>
                            <span>NFT</span>
                        </div>
                        <div className='category__card'>
                            <div><GiShinyPurse /></div>
                            <div className='icon__fire'><HiFire style={{"marginLeft": "3px", "color": "#DB2222"}}/> <span>(+24%)</span></div>
                            <span>Stocks</span>
                        </div>
                        <div className='category__card'>
                            <div><AiFillBank /></div>
                            <div className='icon__fire'><HiFire style={{"marginLeft": "3px", "color": "#DB2222"}}/> <span>(+72%)</span></div>
                            <span>Politics </span> 
                        </div>
                        <div className='category__card'>
                            <div><FaLeaf /></div>
                            <span>Ecology</span>
                        </div>
                    </div>
                    <div className='footer'>
                        <div className='copyright'>
                            <FaCopyright className='text-xl cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-[#20B95F] duration-200' /><span>2022 Bright</span>
                        </div>
                        <div className='social__network__links'>
                            <span>Our media </span> 
                            <BsDiscord className='text-xl cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-[#20B95F] duration-200' />
                            <BsLinkedin className='text-xl ml-2 cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-[#20B95F] duration-200' />
                        </div>
                    </div>
                </div>
        )
    }
}


export default Navigation;