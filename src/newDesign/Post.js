import React, { useState } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';

import Modal from '@mui/material/Modal';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { alpha, styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import SendIcon from '@mui/icons-material/Send';


import UpdateIcon from '@mui/icons-material/Update';
import CancelIcon from '@mui/icons-material/Cancel';


import { categories } from '../utils/categories';

import "../css/modal.css";

import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

import ImageUploading from "react-images-uploading";

import axios from 'axios'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const COLORSCATEGORIE = ['#cb3c33', '#7633cb', '#51a8da', '#51a8da', '#51a8da', '#51a8da']

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1220,
    height: 'auto',
    bgcolor: '#1d1d1d',
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

    const handleChange = () => {
        console.log('test')
    }


    return (
        <div style={{ width: '40%' }} className="card-post">
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
                    Photo / Video / Text
                </div>
                {/* <div className='post_onlytext' onClick={handleClickOpen}>
                    Only Text
                </div> */}
            </div>
            {/* MODAL COMPONENT */}

            {/* <BootstrapDialog
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
                                    </Box>
                                </div>
                            )}
                        </ImageUploading>
                    )}
                </DialogContent>
            </BootstrapDialog> */}
            <div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                    disableAutoFocus={true}
                >
                    <Fade in={open}>
                        <Box sx={style} className='modal_container'>
                            {isLoading ? (<div> test </div>) : (

                                <ImageUploading
                                    multiple
                                    value={images}
                                    onChange={onChange}
                                    maxNumber={maxNumber}
                                    dataURLKey="data_url"
                                    acceptType={["jpg", "png"]}
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
                                        <>
                                            <input placeholder='Give your post a title here ...' className='input_modal' onChange={props.onTitleChange} />
                                            <textarea placeholder='write something here ...' className='textarea_modal' onChange={props.onMessageChange} value={props.message} />
                                            <div className='categorie_display_modal'>
                                                {categorie.map((categorie, index) => {

                                                    return (
                                                        <div className='post_categories' style={{ backgroundColor: COLORSCATEGORIE[index], color: "white" }}>
                                                            #{categorie}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            <div className='bottom_modal_container'>
                                                <div className='button_container_img'>
                                                    <Autocomplete
                                                        multiple
                                                        disableCloseOnSelect
                                                        id="tags-standard"
                                                        onChange={(event, newValue) => {
                                                            setCategorie(newValue)
                                                        }}
                                                        options={categories}
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
                                                        renderInput={(params) => (
                                                            <div ref={params.InputProps.ref}>
                                                                <input type="text" {...params.inputProps} placeholder='Choose a categorie ... ' className='input_modal_multiselect' />
                                                            </div>
                                                        )}

                                                    />
                                                    you don't find your category ?
                                                    <div className='btn_upload_img' onClick={onImageUpload} {...dragProps}>
                                                        Upload images (or not)
                                                        <IconButton>
                                                            <InsertPhotoIcon fontSize="large" />
                                                        </IconButton>
                                                    </div>
                                                    <div style={{ display: 'flex', flexDirection: "row" }}>
                                                        {imageList.map((image, index) => (
                                                            <div key={index} className="image-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: "row" }}>
                                                                <img src={image.data_url} alt="" width="50" />
                                                                <div className="image-item__btn-wrapper" style={{ display: 'flex', gap: "0px", flexDirection: "row" }}>
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
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div>
                                                    <button className='btn_send_modal' onClick={() => {
                                                        setIsLoading(true)
                                                        let booleanVar = props.sendMsg(categorie, images)
                                                        setIsLoading(false)
                                                        setCategorie([])
                                                        if (booleanVar) { handleClose() }
                                                    }}> Send <SendIcon /> </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </ImageUploading>
                            )}
                        </Box>
                    </Fade>
                </Modal>
            </div>
        </div>
    )
}

export default Post;