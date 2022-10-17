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
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

import UpdateIcon from '@mui/icons-material/Update';
import CancelIcon from '@mui/icons-material/Cancel';


import { categories } from '../utils/categories';

import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

import ImageUploading from "react-images-uploading";

import axios from 'axios'

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
    const [images, setImages] = React.useState([]);

    const maxNumber = 69;

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

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

    const testImage = () => {
        const formData = new FormData();
        console.log(images)

        images.forEach(img => {
            formData.append("files", img.file)
        })

        // for (let i = 0; i < images.length; i++) {
        //     console.log('enter')
        //     formData.append(
        //         "files",
        //         images[i].file
        //     );
            
        // }

        console.log(formData);

        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/uploadfiles/?destination=images',
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(function (response) {
                //handle success
                console.log(response);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    }


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
            {/* <div className="TextField-with-border-radius">
                <TextField
                    InputProps={{
                        readOnly: true,
                        style: { color: 'white' }
                    }}
                    label="Hi ! Post something interesting :)"
                    sx={{ width: "100%", fontSize: "0.875rem", cursor: "pointer" }}
                    onClick={handleClickOpen}
                    InputLabelProps={{
                        shrink: false,
                        disableAnimation: false,
                    }}
                /> 
            </div> */}
            <div className='post_container_widget'>
                <div className='post_newpost'>
                    New Post
                </div>
                <div className='post_photovideo' onClick={handleClickOpen}>
                    Photo / Video
                </div>
                <div className='post_onlytext' onClick={handleClickOpen}> 
                    Only Text
                </div>
            </div>
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

                        <ImageUploading
                            multiple
                            value={images}
                            onChange={onChange}
                            maxNumber={maxNumber}
                            dataURLKey="data_url"
                            acceptType={["jpg","png"]}
                        >
                            {({
                                imageList,
                                onImageUpload,
                                onImageRemoveAll,
                                onImageUpdate,
                                onImageRemove,
                                isDragging,
                                dragProps
                            }) => (
                                <div>
                                    <TextField
                                        label="Title"
                                        defaultValue=""
                                        color="primary"
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
                                        color="primary"
                                        sx={{ width: "100%", fontSize: "0.875rem" }}
                                        onChange={props.onMessageChange}
                                        inputProps={{ maxLength: 4000 }}
                                        helperText={props.message.length + "/4000 characters"}
                                        value={props.message}
                                    />
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: "10px", marginTop: '20px', flexDirection: "row" }}>
                                        {imageList.map((image, index) => (
                                            <div key={index} className="image-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: "column" }}>
                                                <img src={image.data_url} alt="" width="100" />
                                                <div className="image-item__btn-wrapper" style={{ display: 'flex', gap: "10px", flexDirection: "row", marginTop: '10px' }}>
                                                    <IconButton
                                                        aria-label="update"
                                                        onClick={() => onImageUpdate(index)}
                                                        color="primary"
                                                    >
                                                        <UpdateIcon size="large" />
                                                    </IconButton>
                                                    <IconButton
                                                        aria-label="remove"
                                                        onClick={() => onImageRemove(index)}
                                                        color="error"
                                                    >
                                                        <CancelIcon size="large" />
                                                    </IconButton>
                                                    {/* <Button variant="contained" color="primary" onClick={() => onImageUpdate(index)}>Update</Button>
                                                    <Button variant="outlined" color="error" onClick={() => onImageRemove(index)}>Remove</Button> */}
                                                </div>
                                            </div>
                                        ))}
                                    </Box>
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
                                        <IconButton
                                            aria-label="add"
                                            style={isDragging ? { color: "red" } : null}
                                            onClick={onImageUpload}
                                            {...dragProps}
                                            color="success"
                                            size="large"
                                        >
                                            <InsertPhotoIcon fontSize="large" />
                                        </IconButton>
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
                                                let booleanVar = props.sendMsg(categorie,images)
                                                setIsLoading(false)
                                                if (booleanVar) { handleClose() }
                                            }}>
                                            Send
                                        </Button>
                                        {/* <Button onClick={testImage}>test</Button> */}
                                    </Box>
                                </div>
                            )}
                        </ImageUploading>
                    )}
                </DialogContent>
            </BootstrapDialog>
        </div>
    )
}

export default Post;