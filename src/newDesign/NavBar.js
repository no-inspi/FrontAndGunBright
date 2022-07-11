import React, { Component } from 'react';
import { Link } from "react-router-dom";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Cloud from '@mui/icons-material/Cloud';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Autocomplete from '@mui/material/Autocomplete';
import ButtonGroup from '@mui/material/ButtonGroup';

// icons material
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import AddBoxIcon from '@mui/icons-material/AddBox';

import {categories} from '../utils/categories';


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
                        <Box sx={{ display: 'flex', alignItems: 'center', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>
                            Bright
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center'}}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', ml: 10 }}>
                            <Autocomplete
                                freeSolo
                                disablePortal
                                id="combo-box-demo"
                                options={this.category.map((option) => option)}
                                sx={{ width: 300 }}
                                onChange={this.updateCategorie}
                                renderInput={(params) => <TextField {...params} id="input-with-sx" label="Type a category..." variant="standard" color="success"  />}
                            />
                            <SearchIcon sx={{ color: 'action.active', mr: 1, cursor: 'pointer' }} />
                        </Box>

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
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    {/* <Button variant="contained" startIcon={<LoginIcon />}>
                            SignIn
                        </Button>
                        <Button variant="contained" startIcon={<AddBoxIcon />} sx={{marginLeft: '20px'}}>
                            SignUp
                        </Button> */}
                                    <ButtonGroup variant="outlined" aria-label="text button group">
                                        <Button sx={{textTransform: 'none'}}>
                                            <Link to="/login">
                                                Login
                                            </Link>
                                        </Button>
                                        <Button sx={{textTransform: 'none'}}>
                                            <Link to="/signup">
                                                SignUp
                                            </Link>
                                        </Button>
                                    </ButtonGroup>
                                </Box>
                            )}
                    </Box>
                </Box>
            </div>
        )
    }
}

export default NavBar;