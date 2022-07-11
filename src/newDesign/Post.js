import React, {useState} from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';

import DoneAllIcon from '@mui/icons-material/DoneAll';
import SendIcon from '@mui/icons-material/Send';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import { categories } from '../utils/categories';

import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// const categories = [
//     { 'name': 'test' },
//     { 'name': 'test2' },
//     { 'name': 'test3' },
//     { 'name': 'test4' },
// ]

const Post = (props) => {

    const [categorie, setCategorie] = useState([])

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
                        props.sendMsg(categories)
                    }}>
                    Send
                </Button>
            </Box>
        </div>
    )
}

export default Post;