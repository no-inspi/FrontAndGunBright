import React, { Component, useRef } from 'react';
import Gun from 'gun/gun';
import Sea from 'gun/sea';
import Unset from 'gun/lib/unset';
import { useAlert } from 'react-alert';
import _ from 'lodash';
import axios from 'axios';

// Component
import TestComponent from './TestComponent.js';
import Navigation from './Navigation.js';
import Header from './Header.js';
import Post from './Post.js';
import Posts from './Posts.js';
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
// material
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

// icons material
import SearchIcon from '@mui/icons-material/Search';
import DoneAllIcon from '@mui/icons-material/DoneAll';


// personnal style
import "../css/navigation.css";
import "../css/timeline.css";
import "../css/header.css";
import favicon from '../images/favicon.png';
import { WindowSharp } from '@mui/icons-material';
import { keyframes } from '@emotion/react';

var cryptoJs = require('crypto-js');

class Home extends Component {
    //const alert = useAlert()

    constructor({ gun, alert }) {
        super()
        this.gun = gun;
        this.userG = gun.user().recall({ sessionStorage: true })
        this.colorStr = ['danger', 'success', 'info']
        this.alert = alert;
        

        this.state = {
            txt: '',
            username: '',
            password: '',
            confirmPassword: '',
            message: '',
            post: [],
            connected: false,
            listBoolComment: [],
            listStrComment: [],
            listColorStr: [],
            SignIn: true,
            usernameTamp: "",
            userGunObject: "",
        };
        // console.log(this.gun.get('users').map());


        // console.log("userG:", this.userG)
    }



    componentDidMount() {
        let post_tmp = this.state.post;
        const self = this;
        this.gun.get('posts').map().on((post, key) => {
            if (post == undefined) {
                // console.log('error')
            } else {
                // console.log("Found post, enter", post.content, key)
                //setPost([post.content])
                var liked_bool = false;
                var disliked_bool = false;
                var comment_bool = false;
                // if(window.sessionStorage.getItem('username')) {
                //     self.gun.get('users').get(window.sessionStorage.getItem('username')).get('liked').map().on(
                //         (data, other_key) => {
                //             if(other_key=='posts/'+key){
                //                 console.log('liked post')
                //                 liked_bool = true;
                //             }

                //         }, []
                //     )

                //     self.gun.get('users').get(window.sessionStorage.getItem('username')).get('disliked').map().on(
                //         (data, other_key) => {
                //             if(other_key=='posts/'+key){
                //                 console.log('disliked post')
                //                 disliked_bool = true;
                //             }
                //         }, []
                //     )
                // }



                var likes = []
                var posts = this.gun.get('posts').get(key);
                var liked = 0
                var disliked = 0
                posts.get('likes').map().on((data, key_like) => {
                    console.log("key like:  ", key)
                    if (data) {
                        // console.log("liked data : ", data)
                        if (data.liked) {
                            liked += 1
                            if (window.sessionStorage.getItem('username')) {
                                if (data.username == window.sessionStorage.getItem('username')) {
                                    liked_bool = true;
                                }
                            }

                        }
                    }

                }, [])

                posts.get('dislikes').map().on((data, key) => {

                    if (data) {
                        if (data.disliked) {
                            disliked += 1
                            if (window.sessionStorage.getItem('username')) {
                                if (data.username == window.sessionStorage.getItem('username')) {
                                    disliked_bool = true;
                                }
                            }
                        }
                    }

                }, [])

                var comment = []
                var posts = this.gun.get('posts').get(key);

                posts.get('comments').map().on((post, key) => {
                    comment.push(post.text)

                }, []);

                posts.get('comments').map().get('author').on((authorcomment, key) => {
                    if (authorcomment.username == window.sessionStorage.getItem('username')) {
                        comment_bool = true;
                    }
                    // console.log(authorcomment)
                }, []);



                let merged = _.merge({ 'key': key }, _.pick(
                    post, ['content', 'key']),
                    { 'liked': liked },
                    { 'disliked': disliked },
                    { 'liked_bool': liked_bool },
                    { 'disliked_bool': disliked_bool },
                    { 'comment_bool': comment_bool }
                );

                merged = Object.assign(merged, { 'comments': comment })

                // console.log("merged:",merged)
                const index = _.findIndex(post_tmp, (o) => { return o.key === key });
                if (index < 0) {
                    post_tmp.push(
                        {
                            'content': post.content,
                            'key': key,
                            'comments': comment,
                            'liked': liked,
                            'disliked': disliked,
                            'liked_bool': liked_bool,
                            'disliked_bool': disliked_bool,
                            'comment_bool': comment_bool
                        }
                    );
                }
                else {
                    post_tmp[index] = merged
                }

            }
            self.setState({ post_tmp })
        }, [])


        console.log("post: ", post_tmp)
        // Generate random color for timeline
        let listColorTmp = []
        for (var i = 0; i < post_tmp.length; i++) {
            let int_tamp = Math.floor(Math.random() * 3)
            listColorTmp.push(this.colorStr[int_tamp])
        }
        this.setState({ listColorStr: listColorTmp })

        // set connection env variable
        if (this.userG.is && window.sessionStorage.getItem('username')) {
            console.log('You are logged in :' + this.userG);
            this.setState({ connected: true })
            this.setState({ usernameTamp: window.sessionStorage.getItem('username') })
        } else {
            console.log('You are not logged in');
            this.setState({ connected: false })
        }
    }

    onMessageChange = (event) => {
        // this.state.message = event.target.value
        this.setState({ message: event.target.value })
    }

    sendMsg = () => {
        if (this.userG.is && window.sessionStorage.getItem('username') && this.state.message != "") {
            // this.userG.get('posts').get("test2").put({content: this.state.message});
            const self = this;
            var currentTimestamp = Date.now();

            var user = this.gun.get('users').get(this.state.usernameTamp);
            var contentToInsert = {
                title: this.state.message + " title",
                slug: this.state.message + "-slug",
                content: this.state.message
            };

            var encryptUniqueStr = currentTimestamp + '+' + this.state.usernameTamp + '+' + this.state.message
            var encryptUniqueId = cryptoJs.AES.encrypt(encryptUniqueStr, 'my-secret-key@123').toString();

            var contentToInsertPost = this.gun.get('posts').get(encryptUniqueId).put(contentToInsert);
            contentToInsertPost.get('author').put(user).get('posts').set(contentToInsertPost);
            this.setState({ message: "" })
            let listColorTmp = []
            for (var i = 0; i < this.state.post.length + 1; i++) {
                let int_tamp = Math.floor(Math.random() * 3)
                listColorTmp.push(this.colorStr[int_tamp])
            }
            this.setState({ listColorStr: listColorTmp })

            axios
                .get("http://127.0.0.1:8000/create_post?id_gun=" + encryptUniqueId + "&username=" + this.state.usernameTamp + "&content=" + this.state.message)
                .then(response =>
                    console.log(response)
                );

            this.alert.success('Post correctly send !')
        }
        else {
            if (this.state.message == "" && this.userG.is) {
                this.alert.error("Message can't be empty")
            }
            else {
                this.alert.error("You can't post when not connected")
            }

        }

    }

    handleChangeSignIn = () => {
        this.setState({ SignIn: !this.state.SignIn })
    }

    // Callback function
    setConnectedFromChild = (booleanVar) => {
        this.setState({ connected: booleanVar })
    }

    setUsernameTampFromChild = (stringVar) => {
        this.setState({ usernameTamp: stringVar })
    }

    setuserGunObjectFromChild = (varGun) => {
        this.setState({ userGunObject: varGun })
    }

    render() {
        return (
            <div>
                <Navigation
                    gun={this.gun}
                    connected={this.state.connected}
                    alert={this.alert}
                    setConnectedFromChild={this.setConnectedFromChild}
                    setUsernameTampFromChild={this.setUsernameTampFromChild}
                    setuserGunObjectFromChild={this.setuserGunObjectFromChild}
                />
                <div className='content__page'>
                    <Header
                        usernameTamp={this.state.usernameTamp}
                        gun={this.gun}
                        setConnectedFromChild={this.setConnectedFromChild}
                        alert={this.alert}
                        connected={this.state.connected}
                    />
                    <Post
                        onMessageChange={this.onMessageChange}
                        message={this.state.message}
                        sendMsg={this.sendMsg}
                    />
                    <Posts
                        post={this.state.post}
                        listColorStr={this.state.listColorStr}
                        userGunObject={this.state.userGunObject}
                        gun={this.gun}
                        usernameTamp={this.state.usernameTamp}
                        alert={this.alert}
                    />
                    {/* <div className="container">
                        <div className="timeline">
                            {this.state.post.map((item, key) => {
                                return (
                                    <div className={`timeline-container ${this.state.listColorStr[key]}`}>
                                        <div className="timeline-icon">
                                            <div className="timeline__icon__space"><FaEthereum /></div>
                                        </div>
                                        <div className="timeline-body">
                                            <h4 className="timeline-title">
                                                <span className="badge">Publié le : 10/05/2022</span>
                                            </h4>
                                            <p>{item.content}</p>
                                            <p className="timeline-subtitle">{item.author}</p>
                                            <div className="timeline-icons-bar">
                                                <span><AiFillLike className="cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
                                                    onClick={() => this.sendLike(item.key)} /></span>
                                                <span><AiFillDislike className="cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
                                                    onClick={() => this.sendDislike(item.key)} /></span>
                                                <span><RiMessage3Fill className="cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
                                                onClick={() => this.displayComSection(key)} /></span>
                                            </div>
                                        </div>
                                        {this.state.listBoolComment[key] ?
                                        <div className='timeline__comment'>
                                            Comments
                                            <ul className="list__comment">
                                                {item.comments.map(comment => {
                                                    return (
                                                        <li className='list__li'><Avatar sx={{ width: 42, height: 42, bgcolor: "#20B95F", fontSize: "12px" }}>df..6h</Avatar><span>{comment}</span></li>
                                                    )
                                                })}                                                
                                            </ul>
                                            <div className='send_comment'>
                                                <Avatar sx={{ width: 42, height: 42, bgcolor: "#20B95F" }}>P</Avatar>
                                                <TextField 
                                                id="input-with-sx" 
                                                label="Type your comment..." 
                                                multiline 
                                                variant="outlined" 
                                                color="success" 
                                                onChange={(event) => this.changeComment(event,item.key)}
                                                sx={{marginLeft: "10px", width:"100%",
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    borderRadius: "15px"
                                                },
                                                '& .MuiInputBase-root': {
                                                    borderRadius: "15px"
                                                }
                                                }}  
                                                
                                                />
                                                <RiSendPlaneFill onClick={() => this.sendComment(item.key)} className='text-[#20B95F] cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 text-3xl ml-2 mr-2'/>
                                            </div>
                                        </div>
                                        : '' }
                                    </div>
                                )
                            })}
                        </div>
                    </div> */}
                    <br></br>
                    <Button variant="contained" onClick={this.GetInitialData} ref={this.rootRef}>GetData</Button><br></br>
                    <Button variant="contained" onClick={this.PutInitialData}>PutData</Button>
                </div>
            </div>)
    }
}

export default Home;