import React, { useRef, useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import { FaEthereum } from 'react-icons/fa';
import { AiFillLike, AiFillDislike, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { IoHeartDislikeOutline } from 'react-icons/io5';
import { IoIosHeartDislike } from 'react-icons/io';
import { RiSendPlaneFill, RiMessage3Fill, RiMessage3Line } from 'react-icons/ri';

import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Badge from '@mui/material/Badge';

import { shortenDate } from '../utils/shortenDate.js';

import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CircularProgress from '@mui/material/CircularProgress';

import "../css/comment.css";

import { useInView, InView } from 'react-intersection-observer';

var cryptoJs = require('crypto-js');


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(0),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(0),
    },
}));

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const COLORSCATEGORIE = ['#cb3c33', '#7633cb', '#51a8da', '#51a8da', '#51a8da', '#51a8da']


const Posts = (props) => {
    // State variables
    const [listBoolComment, setlistBoolComment] = useState([])
    const [listStrComment, setlistStrComment] = useState([])
    const [isVisible, setisVisible] = useState(false)
    const [listBoolPostDisplay, setlistBoolPostDisplay] = useState([])
    const [listStrCommentModal, setListStrCommentModal] = useState([])
    const [modalPost, setModalPost] = useState("")
    const [modalid, setModalid] = useState("")
    const [modalLoading, setModalLoading] = useState(true)
    const [modalCom, setModalCom] = useState("")
    const [modalCategorie, setModalCategorie] = useState([])
    const [modalDate, setModalDate] = useState("")
    const [tableViewBool, setTableViewBool] = useState([])
    // modal state
    const [open, setOpen] = React.useState(false);
    const [url, setUrl] = useState("https://storage.cloud.google.com/braightimgstorage/dots-6297146.jpg?authuser=3")


    const ref = useRef();
    const [inViewRef, inView] = useInView({
        // "triggerOnce": true
    });

    // Use `useCallback` so we don't recreate the function on each render - Could result in infinite loop
    const setRefs = useCallback(
        (node) => {
            // Ref's from useRef needs to have the node assigned to `current`
            ref.current = node;
            // Callback refs, like the one from `useInView`, is a function that takes the node as an argument
            inViewRef(node);
        },
        [inViewRef],
    );

    // const { ref, inView, entry } = useInView({
    //     /* Optional options */
    //     threshold: 0,
    // });
    const PostinView = (inViewBool, key, id_post) => {
        if (window.sessionStorage.getItem('username')) {
            axios
                .get("http://127.0.0.1:8000/update_metrics_view?id_post=" + id_post + "&username=" + window.sessionStorage.getItem('username'))
                .then(response => {
                    console.log(response)
                });
        }

    }

    const handleClickOpen = (comments, post, id, categories, dateM) => {
        setOpen(true);
        console.log(comments, post, categories)
        setListStrCommentModal(comments)
        setModalPost(post)
        setModalid(id)
        setModalCom("")
        setModalCategorie(categories)
        setModalDate(dateM)
        setModalLoading(false)
    };
    const handleClose = () => {
        setOpen(false);
    };



    // componentDidMount() {
    //     Object.values(this.singleRefs).forEach(value =>
    //         this.observer.observe(value.current),
    //     );
    // }

    // useEffect(() => {
    //     console.log(inView)
    // })



    const sendLike = (gunKey, like_bool, dislike_bool) => {
        if (window.sessionStorage.getItem('username')) {
            // const self = this;
            // var currentUser = this.gun.get('users').get(this.props.usernameTamp)
            // var post = this.gun.get('posts').get(gunKey)
            console.log('data for like post :', gunKey, like_bool, dislike_bool);

            if (!like_bool) {

                if (dislike_bool) {
                    console.log('wtf')
                    // currentUser.get('disliked').unset(post)
                    // post.get('dislikes').unset(currentUser)


                    // post.get('likes').set(currentUser)
                    // currentUser.get('liked').set(post)

                    axios
                        .get("http://127.0.0.1:8000/add_like?username=" + props.usernameTamp + "&id_gun=" + gunKey)
                        .then(response =>
                            console.log(response)
                        );
                    props.setChangeVariable(!props.changeVariable)

                } else {
                    console.log('test')
                    // post.get('likes').set(currentUser)
                    // currentUser.get('liked').set(post)
                    axios
                        .get("http://127.0.0.1:8000/add_like?username=" + props.usernameTamp + "&id_gun=" + gunKey)
                        .then(response =>
                            console.log(response)
                        );
                    props.setChangeVariable(!props.changeVariable)
                }
            } else {
                if (!dislike_bool) {
                    // post.get('likes').unset(currentUser)
                    // currentUser.get('liked').unset(post)
                    axios
                        .get("http://127.0.0.1:8000/delete_like?username=" + props.usernameTamp + "&id_gun=" + gunKey)
                        .then(response =>
                            console.log(response)
                        );

                    props.setChangeVariable(!props.changeVariable)
                }
            }
        }
        else {
            props.alert.error('You need to be connected to interact with others posts')
        }




        // post.get('likes').on(function (data) {
        //     console.log(data)
        // })
    }

    const sendDislike = (gunKey, like_bool, dislike_bool) => {
        if (window.sessionStorage.getItem('username')) {
            // var currentUser = this.gun.get('users').get(this.props.usernameTamp)
            // var post = this.gun.get('posts').get(gunKey)
            console.log(gunKey, like_bool, dislike_bool);

            if (!dislike_bool) {

                if (like_bool) {
                    console.log('wtf')
                    // currentUser.get('liked').unset(post)
                    // post.get('likes').unset(currentUser)


                    // post.get('dislikes').set(currentUser)
                    // currentUser.get('disliked').set(post)
                    axios
                        .get("http://127.0.0.1:8000/add_dislike?username=" + props.usernameTamp + "&id_gun=" + gunKey)
                        .then(response =>
                            console.log(response)
                        );
                    props.setChangeVariable(!props.changeVariable)

                } else {
                    console.log('test')
                    // post.get('dislikes').set(currentUser)
                    // currentUser.get('disliked').set(post)
                    axios
                        .get("http://127.0.0.1:8000/add_dislike?username=" + props.usernameTamp + "&id_gun=" + gunKey)
                        .then(response =>
                            console.log(response)
                        );
                    props.setChangeVariable(!props.changeVariable)
                }
            } else {
                if (!like_bool) {
                    // post.get('dislikes').unset(currentUser)
                    // currentUser.get('disliked').unset(post)
                    axios
                        .get("http://127.0.0.1:8000/delete_dislike?username=" + props.usernameTamp + "&id_gun=" + gunKey)
                        .then(response =>
                            console.log(response)
                        );
                    props.setChangeVariable(!props.changeVariable)
                }
            }
        }
        else {
            props.alert.error('You need to be connected to interact with others posts')
        }
        // post.get('dislikes').set(currentUser)
        // currentUser.get('disliked').set(post)
    }

    const displayComSection = (index) => {

        let table_tmp = [...listBoolComment]
        table_tmp[index] = !table_tmp[index]
        setlistBoolComment(table_tmp)
        console.log(index, table_tmp)

    }

    const changeComment = (event) => {
        setModalCom(event.target.value)
    }

    const sendComment = (gunKey) => {
        if (window.sessionStorage.getItem('username') && modalCom != "") {
            console.log('comment display :', modalCom, gunKey)
            var currentTimestamp = Date.now();
            // var currentUser = this.gun.get('users').get(this.props.usernameTamp);
            // var currentUser = userGunObject;
            // var post = this.gun.get('posts').get(gunKey)
            var commentPost = {
                timestamp: currentTimestamp,
                text: modalCom
            };

            // var encryptUniqueStr = currentTimestamp + '+' + props.usernameTamp + '+' + modalCom
            // var encryptUniqueId = cryptoJs.AES.encrypt(encryptUniqueStr, 'my-secret-key@123').toString();

            // console.log('crypt string com : ' + encryptUniqueId)
            // var bytes = cryptoJs.AES.decrypt(encryptUniqueId, 'my-secret-key@123');
            // var decryptedData = bytes.toString(cryptoJs.enc.Utf8);
            // console.log(decryptedData)
            // var sitComment = this.gun.get('comments').get(encryptUniqueId).put(commentPost);
            // sitComment.get('author').put(currentUser).get('comments').set(sitComment);
            // sitComment.get('posts').put(post).get('comments').set(sitComment);
            axios
                .get("http://127.0.0.1:8000/add_comment?username=" + props.usernameTamp + "&id_gun=" + gunKey + "&content=" + modalCom)
                .then(response =>
                    console.log(response)
                );
            console.log(listStrCommentModal)
            var modalcomtab = []
            modalcomtab = listStrCommentModal

            modalcomtab.unshift({ content: modalCom, username: props.usernameTamp })
            console.log(modalcomtab)
            setListStrCommentModal(modalcomtab)
            setModalCom("")
            props.setChangeVariable(!props.changeVariable)
        }
        else {
            if (window.sessionStorage.getItem('username')) {
                props.alert.error("Comment can't be empty")
            }
            else {
                props.alert.error('You need to be connected to interact with others posts')
            }

        }
    }

    const handlePostDisplay = (itemKey) => {
        // let table_tmp = listBoolPostDisplay
        // table_tmp[itemKey] = !table_tmp[itemKey]
        // setlistBoolPostDisplay(table_tmp)
        let table_tmp = listBoolPostDisplay.slice()
        table_tmp[itemKey] = !table_tmp[itemKey]
        setlistBoolPostDisplay(table_tmp)

    }

    const test = (id_gun) => {
        console.log(id_gun)
    }


    return (

        <div style={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: "20px" }}>

            {props.post.length === 0 ? (
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>) : (
                props.post.map((item, key) => {
                    return (
                        <>
                            <InView className='post_container' as="div" threshold={0.5} triggerOnce={true} onChange={(inView, entry) => inView ? PostinView(inView, key, item.id_gun) : ""}>
                                <div className='post_title_container'>
                                    <div className='post_title'>
                                        {item.title}
                                    </div>
                                    <div className='post_date'>
                                        {shortenDate(item.since)}
                                    </div>
                                </div>
                                <div className='post_categories_container'>
                                    {item.categories_list.map((itemBis, index) => {
                                        return (
                                            <div className='post_categories' style={{ backgroundColor: COLORSCATEGORIE[index] }}>
                                                #{itemBis.name}
                                            </div>

                                        )
                                    })}
                                </div>
                                <div className='post_content_container'>
                                    {item.content}

                                    {item.img_list.length > 0 ? (
                                        <div style={{ marginTop: 15 }}>
                                            {/* <img src={require('../images/-2.png')} /> */}
                                            <img src={require=(item.img_list[0].nomimg)}/>
                                        </div>
                                    ) : null}
                                </div>

                                <div className='post_icons_container'>
                                    <Badge color="primary" badgeContent={item.like} showZero className="cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300">
                                        {item.liked_bool ? (
                                            <AiFillHeart
                                                className=" icon-size-footer"
                                                onClick={() => sendLike(item.id_gun, item.liked_bool, item.disliked_bool)}
                                            />) : (
                                            <AiOutlineHeart
                                                className=" icon-size-footer"
                                                onClick={() => sendLike(item.id_gun, item.liked_bool, item.disliked_bool)}
                                            />
                                        )
                                        }
                                    </Badge>
                                    <Badge color="primary" badgeContent={item.dislike} showZero className="cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300">
                                        {item.disliked_bool ? (
                                            <IoIosHeartDislike
                                                className="ml-5 icon-size-footer"
                                                onClick={() => sendDislike(item.id_gun, item.liked_bool, item.disliked_bool)}
                                            />
                                        ) : (
                                            <IoHeartDislikeOutline
                                                className="ml-5 icon-size-footer"
                                                onClick={() => sendDislike(item.id_gun, item.liked_bool, item.disliked_bool)}
                                            />
                                        )
                                        }
                                    </Badge>
                                    <Badge color="primary" badgeContent={item.comments.length} showZero className="cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300">
                                        {item.comment_bool ? (
                                            <RiMessage3Fill
                                                className="ml-5 icon-size-footer"
                                                // onClick={() => handleClickOpen(item.comments, item.content, item.id_gun, item.categories_list, shortenDate(item.since))}
                                                onClick={() => displayComSection(key)}
                                            />
                                        ) : (
                                            <RiMessage3Line
                                                className="ml-5 icon-size-footer"
                                                // onClick={() => handleClickOpen(item.comments, item.content, item.id_gun, item.categories_list, shortenDate(item.since))}
                                                onClick={() => displayComSection(key)}
                                            />
                                        )
                                        }
                                    </Badge>
                                </div>
                            </InView>
                            {listBoolComment[key] ? (
                                <>
                            <div className='title_container_comment'>
                                <div className='title_comments_title'>
                                    Comments
                                </div>
                                <div className='title_comments_closebtn'>
                                    Close Comments <CloseIcon style={{cursor: 'pointer'}} onClick={() => displayComSection(key)} />
                                </div>
                            </div>
                            <div className='comments_section_display_container container_comment'>
                                <div className='comments_section_display_pseudo'>
                                    {window.sessionStorage.getItem('username')}
                                </div>
                                <div className='comments_section_display_input_send_comment'>
                                    {/* <TextField placeholder='Your comments ..' onChange={changeComment} id="input-with-sx" variant="standard" sx={{ width: '100%' }} /> */}
                                    <input value={modalCom} placeholder='Your comment ...' onChange={changeComment} onKeyPress={(e) => e.key === 'Enter' && sendComment(item.id_gun)} />
                                </div>
                            </div>
                            {item.comments.length > 0 ? (
                                item.comments.map((comment) => {
                                    return (
                                        <div className='comments_section_display_container_msg container_comment'>
                                            <div className='comments_flexbox'>
                                                <div className='comments_section_display_pseudo'>
                                                    {comment.username}
                                                </div>
                                                <div className='comments_section_display_content'>
                                                    {shortenDate(comment.since)}
                                                </div>
                                            </div>
                                            <div className='comment_content'>
                                                {comment.content}
                                            </div>
                                        </div>
                                    )
                                })
                            )
                                :
                                (
                                    <div style={{ color: 'white', marginTop: '9px' }}>
                                        Be the first to comment on this post
                                    </div>
                                )
                            }
                            </>
                            )
                            : null}
                        </>
                    )
                })
            )}
            {/* MODAL COMPONENT */}
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth={true}
                maxWidth={"lg"}
            >
                <DialogContent sx={{ backgroundColor: "white" }}>
                    <Box sx={{ width: "100%", height: "100%" }}>
                        <Grid container columnSpacing={0}>
                            <Grid item xs={7} sx={{ backgroundColor: "white" }}>
                                <Box style={{ height: "60vh", paddingTop: "20px", paddingBottom: "50px", paddingLeft: "70px", paddingRight: "70px", overflow: "auto", borderRight: "1px solid #e9edf4" }}>
                                    <div className='card-body'>
                                        <div className='card-row'>
                                            <Avatar sx={{ bgcolor: 'darkgreen' }}>P</Avatar>
                                            <div className='card-body-date'>
                                                <div>{modalCategorie.map((category) => {
                                                    return (
                                                        <span>#{category.name} </span>
                                                    )
                                                })}
                                                </div>
                                                <div className='card-date'>{modalDate}</div>
                                            </div>
                                        </div>
                                        <div className='card-body-content'>
                                            {modalLoading ? "loading" : (
                                                modalPost
                                            )}
                                        </div>
                                    </div>
                                </Box>
                            </Grid>
                            <Grid item xs={5}>
                                <Box sx={{ width: "100%", padding: 1, borderBottom: "1px solid #e9edf4", height: "8%" }}>
                                    <b>Comments</b>
                                    <IconButton
                                        aria-label="close"
                                        onClick={handleClose}
                                        sx={{
                                            position: 'absolute',
                                            right: 2,
                                            top: 2,
                                            color: (theme) => theme.palette.grey[500],
                                        }}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </Box>
                                <Box sx={{ width: "100%", height: "92%", padding: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <Box sx={{ overflow: "auto" }}>
                                        {modalLoading ? "loading" : (

                                            listStrCommentModal.length === 0 ?
                                                (
                                                    <div className='comment-nocomment'>
                                                        0 comments
                                                    </div>
                                                )

                                                : (

                                                    listStrCommentModal.map((item) => {
                                                        return (
                                                            <div className='comment-container'>
                                                                <Avatar sx={{ width: 35, height: 35 }} />
                                                                <div className='comment-author'>{item.username}</div>
                                                                <div className='comment-content'>{item.content}</div>
                                                            </div>
                                                        )

                                                    })
                                                )
                                        )}

                                        {/* <div className='comment-container'>
                                        <Avatar sx={{ width: 35, height: 35 }}/>
                                        <div className='comment-author'>Padaqor</div>
                                        <div className='comment-content'>Lorem ipsum dolor sit amet consectetur adipisicing elitipsum dolor sit amet consectetur adipisicing elit</div>
                                    </div> */}
                                    </Box>
                                    <Box>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%', borderTop: '1px solid #e9edf4' }}>
                                            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                            <TextField value={modalCom} onChange={changeComment} id="input-with-sx" label="Your comment" variant="standard" sx={{ width: '100%' }} />
                                            <Button variant="text" sx={{ textTransform: 'none' }} onClick={() => sendComment(modalid)}>Send</Button>
                                        </Box>
                                    </Box>
                                </Box>

                            </Grid>
                        </Grid>
                    </Box>


                </DialogContent>

            </BootstrapDialog>
            {/* <InView as="div" onChange={(inView, entry) => console.log('Inview:', inView)}>
                <h2>Plain children are always rendered. Use onChange to monitor state.</h2>
            </InView> */}
        </div>
    )
}

export default Posts;