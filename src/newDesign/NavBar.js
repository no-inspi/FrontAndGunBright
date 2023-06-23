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
import Badge from '@mui/material/Badge';

// icons material
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import logobraight from '../images/logoBcouleur.png';


import { categories } from '../utils/categories';
import { BsBorderWidth } from 'react-icons/bs';

// import component 👇
import Drawer from 'react-modern-drawer'

//import styles 👇
import 'react-modern-drawer/dist/index.css'



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
            opendrawer: false,
            usernameTampFirstLetter: '',
            displayNotificationsOverlay: false,
            colorNotif: "#303030",
        };
    }

    // componentDidMount() {
    //     console.log('header didmount',this.props.usernameTamp)
    //     this.setState({ usernameTampFirstLetter:  this.props.usernameTamp.charAt(0).toUpperCase()});
    //     // if(this.state.usernameTampFirstLetter!='') {

    //     // }
    // }

    handleClickDrawer = () => {
        this.setState({ opendrawer: !this.state.opendrawer })
    }


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
        window.location.href('/')
    }

    updateCategorie = (event) => {
        if (event.target.innerText) {
            this.props.setCategorie(event.target.innerText)
        }

    }

    displayNotificationsOverlay = () => {
        var color = "#4599FF"
        if (this.state.colorNotif==color) {
            color = "#303030"
        }
        this.setState({displayNotificationsOverlay: !this.state.displayNotificationsOverlay, colorNotif: color})
    }




    render() {
        const notifications = [
            {
                'description': 'You have 14 likes on your post'
            },
            {
                'description': 'A new post about Artifical Intelligence has been posted'
            },
            // {
            //     'description': 'une description de la notif numero 3'
            // }
        ]
        return (
            <div className="top__header">
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', ml: 10, mr: 10 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', letterSpacing: '1px', fontWeight: '600', color: 'white', fontSize: '40px', cursor: 'pointer' }}>
                            <Link to="/">
                                Braight 
                            </Link>
                        </Box>
                        <Box sx={{ color: '#808080', fontSize: "12px" }}>
                            Le réseau de l'influence anonyme
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
                                    sx={{ width: '45vw', height: 'auto', color: 'white' }}
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
                                    <Box style={{position: "relative"}} sx={{mr: 2}} onClick={this.displayNotificationsOverlay} className="notification_animated">
                                        <Avatar sx={{ bgcolor: this.state.colorNotif, cursor: "pointer"}} className="notifications_icon">
                                                <NotificationsIcon />
                                        </Avatar>
                                        <div className='notifications_number'>
                                            {notifications.length}
                                        </div>
                                    </Box>
                                    <Button
                                        id="demo-customized-button"
                                        variant="contained"
                                        disableElevation
                                        onClick={this.handleClickDrawer}
                                        endIcon={<KeyboardArrowDownIcon size="large" />}
                                        startIcon={<Avatar sx={{ width: 24, height: 24, mr: 2, ml: 0, bgcolor: '#959595' }}></Avatar>}
                                        sx={{ textTransform: 'none', borderRadius: '20px', backgroundColor: "#303030" }}
                                    >
                                        <Box sx={{ mr: 2 }}>
                                            {this.props.usernameTamp}
                                        </Box>
                                    </Button>
                                    <Drawer
                                        open={this.state.opendrawer}
                                        onClose={this.handleClickDrawer}
                                        direction='right'
                                        className='drawer_container'
                                        style={{ backgroundColor: '#303030' }}
                                        size={384}
                                    >
                                        <div className='drawer_container_in'>
                                            <div className='drawer_avatar'>
                                                <div>
                                                    <Avatar sx={{ width: 100, height: 100, bgcolor: '#545454' }}></Avatar>
                                                </div>
                                                <div className='drawer_avatar_name'>
                                                    {this.props.usernameTamp}
                                                </div>
                                            </div>
                                            <div className='drawer_links_container'>
                                                <div className='drawer_link'>
                                                    <Link to="/user/mypost">
                                                        <ArrowForwardIcon /> My Posts
                                                    </Link>
                                                </div>
                                                <div className='drawer_link'>
                                                    <Link to="/user/likedpost">
                                                        <FavoriteIcon /> Liked Posts
                                                    </Link>
                                                </div>
                                                <div className='drawer_link'>
                                                    <BookmarkIcon /> Saved Posts
                                                </div>
                                            </div>
                                            <div className='drawer_settings'>
                                                <div className='drawer_link_settings'>
                                                <Link to="/user/settings">
                                                    <SettingsIcon /> Settings
                                                </Link>
                                                </div>
                                                <div className='drawer_link_settings' onClick={this.disconnected}>
                                                    <ExitToAppIcon /> Déconnexion
                                                </div>
                                            </div>
                                        </div>
                                    </Drawer>
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
                                    <BootstrapButton variant="contained" sx={{ mr: 2 }}>
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
                {this.state.displayNotificationsOverlay ? (
                    <div className='notification_div_fixed'>
                    <div className='notification_div_fixed_title'>
                        Notifications
                    </div>
                    <div className='notification_div_fixed_subtitle_container'>
                        <div className='notification_div_fixed_subtitle_nonlu'>Not read</div>
                        <div className='notification_div_fixed_subtitle_voirtout'>See all</div>
                    </div>
                    {notifications.map((notification, i) => {
                        return (
                            <div className='notification_div_container'>
                                <div className='notification_div_subcontainer'>
                                    <img src={logobraight} className="notifications_logobraight"/>
                                    {notification.description}
                                </div>
                            </div>
                        )
                    })}
                </div>
                ): ''}
                
            </div>
        )
    }
}

export default NavBar;