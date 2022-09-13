import React, { Component } from 'react';
import { Link } from "react-router-dom";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Autocomplete from '@mui/material/Autocomplete';
import ButtonGroup from '@mui/material/ButtonGroup';
import { alpha, styled } from "@mui/material/styles";
import InputBase from '@mui/material/InputBase';

// icons material
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';


import { categories } from '../utils/categories';
import { BsBorderWidth } from 'react-icons/bs';


const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    borderRadius: '20px',
    fontSize: '1rem',
    padding: '6px 20px',
    backgroundColor: '#303030',
    '&:hover': {
        backgroundColor: '#0069d9',
        borderColor: '#0062cc',
        boxShadow: 'none',
    },
    '&:active': {
        boxShadow: 'none',
        backgroundColor: '#0062cc',
        borderColor: '#005cbf',
    },
    '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
});

class NavBar extends Component {


    constructor() {
        super()

        this.category = categories

        this.state = {
            anchorEl: null,
            open: null,
            usernameTampFirstLetter: '',
        };
    }

    // componentDidMount() {
    //     console.log('header didmount',this.props.usernameTamp)
    //     this.setState({ usernameTampFirstLetter:  this.props.usernameTamp.charAt(0).toUpperCase()});
    //     // if(this.state.usernameTampFirstLetter!='') {

    //     // }
    // }


    handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({ anchorEl: event.currentTarget, open: event.currentTarget })
    };

    handleClose = () => {
        console.log('test in header:', this.props.usernameTamp)
        this.setState({ anchorEl: null, open: null })
    };

    disconnected = () => {
        // this.userG.leave()
        this.props.setConnectedFromChild(false)
        // this.alert.success('User correctly disconnected')
        window.sessionStorage.removeItem("username")
        window.location.reload()
    }

    updateCategorie = (event) => {
        if (event.target.innerText) {
            this.props.setCategorie(event.target.innerText)
        }

    }




    render() {
        return (
            <div className="top__header">
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', ml: 10, mr: 10 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600', color: 'white', fontSize: '22px' }}>
                            Braight
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <div className='searchBar'>
                                <Autocomplete
                                    freeSolo
                                    disablePortal
                                    id="combo-box-demo"
                                    options={this.category.map((option) => option)}
                                    sx={{ width: 800, height: 'auto', color: 'white' }}
                                    onChange={this.updateCategorie}
                                    renderInput={(params) => (

                                        <TextField {...params} id="input-with-sx" label="Type a category..." variant="outlined" size="small"
                                            style={{ backgroundColor: '#303030', borderRadius: '20px' }}
                                            sx={{
                                                "& .MuiFormLabel-root": {
                                                    color: '#959595'
                                                },
                                                "& .MuiFormLabel-root.Mui-focused": {
                                                    color: '#959595'
                                                },
                                                "& .MuiOutlinedInput-root.Mui-focused": {
                                                    "& > fieldset": {
                                                        borderColor: "transparent",
                                                    }
                                                }
                                            }}
                                        />

                                    )
                                    }
                                />
                            </div>
                            {/* <SearchIcon sx={{ color: 'white', mr: 1, cursor: 'pointer', }} /> */}
                        </Box>
                    </Box>
                    <Box>
                        {this.props.connected ?
                            <Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                    <Tooltip title={this.props.usernameTamp.toUpperCase()}>
                                        <IconButton
                                            onClick={this.handleClick}
                                            size="small"
                                            sx={{ ml: 2 }}
                                            aria-controls={this.state.open ? 'account-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={this.state.open ? 'true' : undefined}
                                        >
                                            <Avatar sx={{ width: 42, height: 42, bgcolor: "#20B95F" }}>{this.props.usernameTamp.charAt(0).toUpperCase()}</Avatar>
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={this.state.anchorEl}
                                    open={this.state.open}
                                    onClose={this.handleClose}
                                    onClick={this.handleClose}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            '&:before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 20,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <MenuItem>
                                        <Avatar /> Profile
                                    </MenuItem>
                                    <MenuItem>
                                        <Avatar /> My account
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem>
                                        <ListItemIcon>
                                            <PersonAdd fontSize="small" />
                                        </ListItemIcon>
                                        Add another account
                                    </MenuItem>
                                    <MenuItem>
                                        <Link to="/admin">
                                            <ListItemIcon>
                                                <Settings fontSize="small" />
                                            </ListItemIcon>
                                            Admin
                                        </Link>
                                    </MenuItem>
                                    <MenuItem onClick={this.disconnected}>
                                        <ListItemIcon>
                                            <Logout fontSize="small" />
                                        </ListItemIcon>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </Box>
                            :
                            (
                                <Box sx={{ display: 'flex', alignItems: 'center'}}>
                                    {/* <Button variant="contained" startIcon={<LoginIcon />}>
                            SignIn
                        </Button>
                        <Button variant="contained" startIcon={<AddBoxIcon />} sx={{marginLeft: '20px'}}>
                            SignUp
                        </Button> */}
                                    {/* <ButtonGroup variant="outlined" aria-label="text button group">
                                        <Button sx={{ textTransform: 'none', borderRadius: 20, borderColor: 'transparent', backgroundColor: '#303030', color: 'white' }}>
                                            <Link to="/login">
                                                Login
                                            </Link>
                                        </Button>
                                        <Button sx={{ textTransform: 'none', borderRadius: 20, borderColor: 'transparent', backgroundColor: '#303030', color: 'white' }}>
                                            <Link to="/signup">
                                                SignUp
                                            </Link>
                                        </Button>
                                    </ButtonGroup>
                                     */}
                                    <BootstrapButton variant="contained" sx={{mr: 2}}>
                                        <Link to="/login">
                                            Login
                                        </Link>
                                    </BootstrapButton>
                                    <BootstrapButton variant="contained">
                                        <Link to="/signup">
                                            Sign up
                                        </Link>
                                    </BootstrapButton>
                                </Box>
                            )}
                    </Box>
                </Box>
            </div>
        )
    }
}

export default NavBar;