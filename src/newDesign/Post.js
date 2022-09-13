import React, { useState } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';


import { categories } from '../utils/categories';

import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(0),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(0),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const Post = (props) => {

    const [categorie, setCategorie] = useState([])
    // modal state
    const [open, setOpen] = React.useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleCategoriesChanged = (e) => {
        e.preventDefault();
        console.log(e.target.value)
    }

    const [editorState, setEditorState] = React.useState(() =>
        EditorState.createEmpty()
    );

    const editor = React.useRef(null);
    function focusEditor() {
        editor.current.focus();
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };


    return (
        <div style={{ width: '50%' }} className="card-post">
            {/* <div
                style={{ border: "1px solid black", minHeight: "6em", cursor: "text" }}
                onClick={focusEditor}
                >
                <Editor
                    ref={editor}
                    editorState={editorState}
                    onChange={setEditorState}
                    placeholder="Write something!"
                />
            </div> */}
            {/* <Button onClick={handleClickOpen}>Test modal</Button> */}
            <div className="TextField-with-border-radius">
                <TextField
                    InputProps={{
                        readOnly: true,
                    }}
                    label="Hi ! Post something interesting :)"
                    color="success"
                    sx={{ width: "100%", fontSize: "0.875rem", cursor: "pointer" }}
                    onClick={handleClickOpen}
                />
            </div>
            {/* <TextField
                label="Title"
                defaultValue=""
                color="success"
                sx={{ width: "100%", fontSize: "0.875rem", marginBottom: "20px" }}
                inputProps={{ maxLength: 200 }}
                helperText={props.title.length + "/200 characters"}
                onChange={props.onTitleChange}
            />
            <TextField
                id="filled-multiline-static"
                label="Type your post here..."
                multiline
                rows={4}
                defaultValue=""
                // variant="filled"
                color="success"
                sx={{ width: "100%", fontSize: "0.875rem" }}
                onChange={props.onMessageChange}
                inputProps={{ maxLength: 4000 }}
                helperText={props.message.length + "/4000 characters"}
                value={props.message}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px' }}>
                <Autocomplete
                    multiple
                    id="checkboxes-tags-demo"
                    limitTags={2}
                    options={categories}
                    disableCloseOnSelect
                    onChange={(event, newValue) => {
                        setCategorie(newValue)
                    }}
                    getOptionLabel={(option) => option}
                    renderOption={(props, option, { selected }) => (
                        <li {...props}>
                            <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                            />
                            {option}
                        </li>
                    )}
                    style={{ width: "40%" }}
                    renderInput={(params) => (
                        <TextField {...params} label="Categories that describe best your post" placeholder="Select one or more categories" />
                    )}
                />
                <Button variant="contained" sx={{
                    color: 'white',
                    width: 'auto',
                    maxWidth: 150,
                    // backgroundColor: '#20B95F',
                    mt: '0.75rem',
                    borderRadius: 1.5,
                }}
                    onClick={() => {
                        props.sendMsg(categorie)
                    }}>
                    Send
                </Button>
            </Box> */}
            {/* MODAL COMPONENT */}
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth={true}
                maxWidth={"lg"}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Send a post
                </BootstrapDialogTitle>
                <DialogContent style={{ padding: 20 }}>
                    {isLoading ? (<div> test </div>) : (
                        <div>
                            <TextField
                                label="Title"
                                defaultValue=""
                                color="success"
                                sx={{ width: "100%", fontSize: "0.875rem", marginBottom: "20px" }}
                                inputProps={{ maxLength: 200 }}
                                helperText={props.title.length + "/200 characters"}
                                onChange={props.onTitleChange}
                            />
                            <TextField
                                id="filled-multiline-static"
                                label="Type your post here..."
                                multiline
                                rows={4}
                                defaultValue=""
                                // variant="filled"
                                color="success"
                                sx={{ width: "100%", fontSize: "0.875rem" }}
                                onChange={props.onMessageChange}
                                inputProps={{ maxLength: 4000 }}
                                helperText={props.message.length + "/4000 characters"}
                                value={props.message}
                            />
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px' }}>
                                <Autocomplete
                                    multiple
                                    id="checkboxes-tags-demo"
                                    limitTags={2}
                                    options={categories}
                                    disableCloseOnSelect
                                    onChange={(event, newValue) => {
                                        setCategorie(newValue)
                                    }}
                                    getOptionLabel={(option) => option}
                                    renderOption={(props, option, { selected }) => (
                                        <li {...props}>
                                            <Checkbox
                                                icon={icon}
                                                checkedIcon={checkedIcon}
                                                style={{ marginRight: 8 }}
                                                checked={selected}
                                            />
                                            {option}
                                        </li>
                                    )}
                                    style={{ width: "40%" }}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Categories that describe best your post" placeholder="Select one or more categories" />
                                    )}
                                />
                                <Button variant="contained" sx={{
                                    color: 'white',
                                    width: 'auto',
                                    maxWidth: 150,
                                    // backgroundColor: '#20B95F',
                                    mt: '0.75rem',
                                    borderRadius: 1.5,
                                }}
                                    onClick={() => {
                                        setIsLoading(true)
                                        let booleanVar = props.sendMsg(categorie)
                                        setIsLoading(false)
                                        if (booleanVar) { handleClose() }
                                    }}>
                                    Send
                                </Button>
                            </Box>
                        </div>
                    )}
                </DialogContent>
            </BootstrapDialog>
        </div>
    )
}

export default Post;