import React, { Component } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import DoneAllIcon from '@mui/icons-material/DoneAll';

class Header extends Component {
    render() {
        return (
            <div className="post__container">
                <TextField
                    id="filled-multiline-static"
                    label="Type your post here..."
                    multiline
                    rows={3}
                    defaultValue=""
                    // variant="filled"
                    color="success"
                    sx={{ width: "100%" }}
                    onChange={this.props.onMessageChange}
                    inputProps={{ maxLength: 4000 }}
                    helperText={this.props.message.length + "/4000 characters"}
                    value={this.props.message}
                />
                <Button variant="contained" sx={{
                    color: 'white',
                    width: 'auto',
                    maxWidth: 150,
                    backgroundColor: '#20B95F',
                    mt: '0.75rem',
                    borderRadius: 50,
                }}
                    onClick={() => {
                        this.props.sendMsg()
                    }}>
                    Send <DoneAllIcon className="ml-1" />
                </Button>
            </div>
        )
    }
}

export default Header;