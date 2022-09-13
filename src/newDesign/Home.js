import React, { Component, useRef, useState, useEffect } from 'react';
import Gun from 'gun/gun';
import Sea from 'gun/sea';
import Unset from 'gun/lib/unset';
import { useAlert } from 'react-alert';
import _ from 'lodash';
import axios from 'axios';

// Component
import NavBar from './NavBar';
import Post from './Post';
import Posts from './Posts';
import Categorie from './Categorie';
import LatestNews from './LatestNews';
import useIntersection from '../utils/useIntersection';

// icons
import { FaBeer, FaEthereum, FaBitcoin, FaLeaf, FaFire } from 'react-icons/fa';
import { AiFillLike, AiFillDislike, AiOutlineComment, AiFillCar, AiFillBank } from 'react-icons/ai';
import { SiHiveBlockchain } from 'react-icons/si';
import { GiShinyPurse } from 'react-icons/gi';
import { BsPeopleFill } from 'react-icons/bs';
import { MdSendToMobile } from 'react-icons/md';
import { HiFire } from 'react-icons/hi';
import { RiSendPlaneFill, RiMessage3Fill } from 'react-icons/ri';
import {ImSpinner2} from 'react-icons/im'
// material
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


// icons material
import SearchIcon from '@mui/icons-material/Search';
import DoneAllIcon from '@mui/icons-material/DoneAll';


// personnal style
import "../css/navigation.css";
import "../css/timeline.css";
import "../css/header.css";
import "../css/post.css";
import "../css/categorie.css";
import favicon from '../images/favicon.png';
import { WindowSharp } from '@mui/icons-material';
import { keyframes } from '@emotion/react';

var cryptoJs = require('crypto-js');

const Home = () => {
    //const alert = useAlert()
    const [message, setMessage] = useState("")
    const [title, setTitle] = useState("")
    const [post, setPost] = useState([])
    const [connected, setconnected] = useState(false)
    const [listBoolComment, setlistBoolComment] = useState([])
    const [listStrComment, setlistStrComment] = useState([])
    const [usernameTamp, setusernameTamp] = useState("")
    const [changeVariable, setChangeVariable] = useState(false)

    const [categorie, setCategorie] = useState("")

    const [loading, setLoading] = useState(true)

    const alert = useAlert()


    // constructor({ gun, alert }) {
    //     super()
    //     this.gun = gun;
    //     this.userG = gun.user().recall({ sessionStorage: true })
    //     this.colorStr = ['danger', 'success', 'info']
    //     this.alert = alert;


    //     this.state = {
    //         message: '',
    //         post: [],
    //         connected: false,
    //         listBoolComment: [],
    //         listStrComment: [],
    //         usernameTamp: "",
    //     };
    //     // console.log(this.gun.get('users').map());


    //     // console.log("userG:", this.userG)
    // }

    useEffect(() => {
        const el = document.querySelector(".loader-container");
        if (el) {
            el.remove();
        }
        GetPosts(categorie)
        setLoading(false)
    }, [changeVariable,categorie]);

    const GetPosts = (search) => {
        if (search != "") {
            var posts = []
            axios
                .get("http://127.0.0.1:8000/get_posts_by_categorie?categorie="+search)
                .then(response => {
                    posts = response.data
                    console.table(posts)
                    if (window.sessionStorage.getItem('username')) {
                        var username = window.sessionStorage.getItem('username')
                        for (let i = 0; i < posts.length; i++) {
                            // Initialized
                            var liked_bool = false;
                            var disliked_bool = false;
                            var comment_bool = false;

                            const found_comment = posts[i].comments.find(element => element.username === username)
                            if (found_comment) {
                                comment_bool = true;
                            }
                            const found_like = posts[i].liked_list.find(element => element.username === username)
                            if (found_like) {
                                liked_bool = true;
                            }
                            const found_dislike = posts[i].disliked_list.find(element => element.username === username)
                            if (found_dislike) {
                                disliked_bool = true;
                            }


                            posts[i].comment_bool = comment_bool;
                            posts[i].liked_bool = liked_bool;
                            posts[i].disliked_bool = disliked_bool;

                        }
                        setPost(posts)


                    } else {
                        setPost(response.data);
                    }


                });

            if (window.sessionStorage.getItem('username')) {
                console.log('You are logged in :')
                setconnected(true)
                setusernameTamp(window.sessionStorage.getItem('username'));
            } else {
                console.log('You are not logged in');
                setconnected(false)
            }
        }
        else {

            var posts = []
            axios
                .get("http://127.0.0.1:8000/get_posts?search=")
                .then(response => {
                    posts = response.data
                    console.table(posts)
                    if (window.sessionStorage.getItem('username')) {
                        var username = window.sessionStorage.getItem('username')
                        for (let i = 0; i < posts.length; i++) {
                            // Initialized
                            var liked_bool = false;
                            var disliked_bool = false;
                            var comment_bool = false;

                            const found_comment = posts[i].comments.find(element => element.username === username)
                            if (found_comment) {
                                comment_bool = true;
                            }
                            const found_like = posts[i].liked_list.find(element => element.username === username)
                            if (found_like) {
                                liked_bool = true;
                            }
                            const found_dislike = posts[i].disliked_list.find(element => element.username === username)
                            if (found_dislike) {
                                disliked_bool = true;
                            }


                            posts[i].comment_bool = comment_bool;
                            posts[i].liked_bool = liked_bool;
                            posts[i].disliked_bool = disliked_bool;

                        }
                        setPost(posts)


                    } else {
                        setPost(response.data);
                    }


                });

            if (window.sessionStorage.getItem('username')) {
                console.log('You are logged in :')
                setconnected(true)
                setusernameTamp(window.sessionStorage.getItem('username'));
            } else {
                console.log('You are not logged in');
                setconnected(false)
            }
        }
    }

    const onMessageChange = (event) => {
        // this.state.message = event.target.value
        // this.setState({ message: event.target.value })
        setMessage(event.target.value)
    }

    const onTitleChange = (event) => {
        // this.state.message = event.target.value
        // this.setState({ message: event.target.value })
        setTitle(event.target.value)
    }

    const sendMsg = (categoriesTab) => {
        console.log(categoriesTab)
        var categorieStr = ""
        for (let i = 0; i < categoriesTab.length; i++) {
            categorieStr = categorieStr + "&c=" + categoriesTab[i]
        }

        if (categoriesTab.length == 0) {
            alert.error("You need to give at least one category")
            return false
        }
        else {

            if (window.sessionStorage.getItem('username') && message != "") {

                var currentTimestamp = Date.now();

                var contentToInsert = {
                    title: message + " title",
                    slug: message + "-slug",
                    content: message,
                    PostDate: currentTimestamp
                };

                var encryptUniqueStr = currentTimestamp + '+' + usernameTamp + '+' + message
                var encryptUniqueId = cryptoJs.AES.encrypt(encryptUniqueStr, 'my-secret-key@123').toString();

                
                console.log('test:', title)
                axios
                    .get("http://127.0.0.1:8000/create_post?id_gun=" + encryptUniqueId + "&title="+ title + "&username=" + usernameTamp + "&content=" + message + categorieStr)
                    .then(response =>
                        console.log(response)
                    );

                alert.success('Post correctly send !')
                setMessage("")
                setTitle("")
                setChangeVariable(!changeVariable)
                return true
            }
            else {
                if (message == "" && window.sessionStorage.getItem('username')) {
                    alert.error("Message can't be empty")
                    return false
                }
                else {
                    alert.error("You can't post when not connected")
                    return false
                }

            }
        }

    }

    // Callback function
    const setConnectedFromChild = (booleanVar) => {
        setconnected(booleanVar)
    }

    const setUsernameTampFromChild = (stringVar) => {
        this.setState({ usernameTamp: stringVar })
    }

    

    return (
        <div style={{backgroundColor: "#121212"}}>
            <NavBar
                usernameTamp={usernameTamp}
                setConnectedFromChild={setConnectedFromChild}
                connected={connected}
                alert={alert}
                categorie={categorie}
                setCategorie={setCategorie}
            />
            <div>
                <div style={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: "20px" }}>
                    <Post
                        onMessageChange={onMessageChange}
                        message={message}
                        sendMsg={sendMsg}
                        title={title}
                        setTitle={setTitle}
                        onTitleChange={onTitleChange}
                    />
                </div>
                {loading ? (
                <div style={{textAlign: "center", width: "100%", height: "100%", justifyContent: "center", marginLeft: "50%", marginTop: "30px"}}>
                    <ImSpinner2 style={{fontSize: 25}}/>
                </div>
                ) : (
                <Posts
                    post={post}
                    usernameTamp={usernameTamp}
                    changeVariable={changeVariable}
                    setChangeVariable={setChangeVariable}
                    alert={alert}
                />
                )}
                <Categorie categorie={categorie} setCategorie={setCategorie} />
                <LatestNews />
            </div>

        </div>)
}

export default Home;