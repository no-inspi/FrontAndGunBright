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
import Avatar from '@mui/material/Avatar';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';


const AdminNav = (props) => {

    return (
        <div className="top__header">
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', ml: 10, mr: 10 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>
                        Brightadmin
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ButtonGroup variant="outlined" aria-label="text button group">
                        <Button sx={{ textTransform: 'none' }}>
                            <Link to="/">
                                Go back home
                            </Link>
                        </Button>
                    </ButtonGroup>
                </Box>
            </Box>
        </div>
    )
}

export default AdminNav;