import React, { Component, useRef, useEffect, useState } from 'react';
import axios from 'axios';

import { FaEthereum } from 'react-icons/fa';
import { AiFillLike, AiFillDislike, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { IoHeartDislikeOutline } from 'react-icons/io5';
import { IoIosHeartDislike } from 'react-icons/io';
import { RiSendPlaneFill, RiMessage3Fill, RiMessage3Line } from 'react-icons/ri';

import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';

var cryptoJs = require('crypto-js');

class Posts extends Component {

    constructor({ gun, alert, post }) {
        super()

        this.rootRef = React.createRef();
        console.log(post)

        this.singleRefs = post.reduce((acc, value) => {
            acc[value.key] = React.createRef();
            return acc;
        }, {});
        const callback = entries => {
            console.log('test:',entries);
            entries.forEach(
               
                entry =>
                    console.log(entry)
                  (this.singleRefs[entry.target.id].ratio =
                    entry.intersectionRatio),
              );
        };

        this.observer = new IntersectionObserver(callback, {
            root: this.rootRef.current,
            threshold: 1,
        });

        this.gun = gun;
        this.alert = alert;
        this.userG = gun.user().recall({ sessionStorage: true })

        this.state = {
            listBoolComment: [],
            listStrComment: [],
            listColorStr: [],
            isVisible: false,
        };

        // console.log(this.gun.get('users').map());
        console.log(this.singleRefs)

    }

    componentDidMount() {
        Object.values(this.singleRefs).forEach(value =>
            this.observer.observe(value.current),
        );
    }



    sendLike = (gunKey, like_bool, dislike_bool) => {
        if (this.userG.is && window.sessionStorage.getItem('username')) {
            const self = this;
            var currentUser = this.gun.get('users').get(this.props.usernameTamp)
            var post = this.gun.get('posts').get(gunKey)
            console.log('data for like post :', gunKey, like_bool, dislike_bool);

            if (!like_bool) {

                if (dislike_bool) {
                    console.log('wtf')
                    currentUser.get('disliked').unset(post)
                    post.get('dislikes').unset(currentUser)


                    post.get('likes').set(currentUser)
                    currentUser.get('liked').set(post)

                    axios
                        .get("https://mainapibase-trovu5k74a-ew.a.run.app/add_like?username=" + this.props.usernameTamp + "&id_gun=" + gunKey)
                        .then(response =>
                            console.log(response)
                        );

                } else {
                    console.log('test')
                    post.get('likes').set(currentUser)
                    currentUser.get('liked').set(post)
                    axios
                        .get("https://mainapibase-trovu5k74a-ew.a.run.app/add_like?username=" + this.props.usernameTamp + "&id_gun=" + gunKey)
                        .then(response =>
                            console.log(response)
                        );
                }
            } else {
                if (!dislike_bool) {
                    post.get('likes').unset(currentUser)
                    currentUser.get('liked').unset(post)
                    axios
                        .get("https://mainapibase-trovu5k74a-ew.a.run.app/delete_like?username=" + this.props.usernameTamp + "&id_gun=" + gunKey)
                        .then(response =>
                            console.log(response)
                        );
                }
            }
        }
        else {
            this.alert.error('You need to be connected to interact with others posts')
        }




        // post.get('likes').on(function (data) {
        //     console.log(data)
        // })
    }

    sendDislike = (gunKey, like_bool, dislike_bool) => {
        if (this.userG.is && window.sessionStorage.getItem('username')) {
            var currentUser = this.gun.get('users').get(this.props.usernameTamp)
            var post = this.gun.get('posts').get(gunKey)
            console.log(gunKey, like_bool, dislike_bool);

            if (!dislike_bool) {

                if (like_bool) {
                    console.log('wtf')
                    currentUser.get('liked').unset(post)
                    post.get('likes').unset(currentUser)


                    post.get('dislikes').set(currentUser)
                    currentUser.get('disliked').set(post)
                    axios
                        .get("https://mainapibase-trovu5k74a-ew.a.run.app/add_dislike?username=" + this.props.usernameTamp + "&id_gun=" + gunKey)
                        .then(response =>
                            console.log(response)
                        );

                } else {
                    console.log('test')
                    post.get('dislikes').set(currentUser)
                    currentUser.get('disliked').set(post)
                    axios
                        .get("https://mainapibase-trovu5k74a-ew.a.run.app/add_dislike?username=" + this.props.usernameTamp + "&id_gun=" + gunKey)
                        .then(response =>
                            console.log(response)
                        );
                }
            } else {
                if (!like_bool) {
                    post.get('dislikes').unset(currentUser)
                    currentUser.get('disliked').unset(post)
                    axios
                        .get("https://mainapibase-trovu5k74a-ew.a.run.app/delete_dislike?username=" + this.props.usernameTamp + "&id_gun=" + gunKey)
                        .then(response =>
                            console.log(response)
                        );
                }
            }
        }
        else {
            this.alert.error('You need to be connected to interact with others posts')
        }
        // post.get('dislikes').set(currentUser)
        // currentUser.get('disliked').set(post)
    }

    displayComSection = (index) => {
        let table_tmp = this.state.listBoolComment
        table_tmp[index] = !table_tmp[index]
        this.setState({ listBoolComment: table_tmp })
    }

    changeComment = (event, index) => {
        let table_tmp = this.state.listStrComment
        table_tmp[index] = event.target.value
        this.setState({ listStrComment: table_tmp })
    }

    sendComment = (gunKey) => {
        if (this.userG.is && window.sessionStorage.getItem('username') && this.state.listStrComment[gunKey] != "") {
            console.log('comment display :', this.state.listStrComment[gunKey], gunKey)
            var currentTimestamp = Date.now();
            var currentUser = this.gun.get('users').get(this.props.usernameTamp);
            // var currentUser = this.state.userGunObject;
            var post = this.gun.get('posts').get(gunKey)
            var commentPost = {
                timestamp: currentTimestamp,
                text: this.state.listStrComment[gunKey]
            };

            var encryptUniqueStr = currentTimestamp + '+' + this.props.usernameTamp + '+' + this.state.listStrComment[gunKey]
            var encryptUniqueId = cryptoJs.AES.encrypt(encryptUniqueStr, 'my-secret-key@123').toString();

            console.log('crypt string com : ' + encryptUniqueId)
            // var bytes = cryptoJs.AES.decrypt(encryptUniqueId, 'my-secret-key@123');
            // var decryptedData = bytes.toString(cryptoJs.enc.Utf8);
            // console.log(decryptedData)
            var sitComment = this.gun.get('comments').get(encryptUniqueId).put(commentPost);
            sitComment.get('author').put(currentUser).get('comments').set(sitComment);
            sitComment.get('posts').put(post).get('comments').set(sitComment);
            axios
                .get("https://mainapibase-trovu5k74a-ew.a.run.app/add_comment?username=" + this.props.usernameTamp + "&id_gun=" + encryptUniqueId + "&content=" + this.state.listStrComment[gunKey])
                .then(response =>
                    console.log(response)
                );
        }
        else {
            if (this.userG.is) {
                this.alert.error("Comment can't be empty")
            }
            else {
                this.alert.error('You need to be connected to interact with others posts')
            }

        }
    }

    render() {
        return (
            <div className="container">
                <div className="timeline" ref={this.rootRef}>
                    {this.props.post.map((item, key) => {
                        return (
                            <div className={`timeline-container`} ref={this.singleRefs[item.key]} id={item.key}>
                                <div className="timeline-icon">
                                    <div className="timeline__icon__space"><FaEthereum /></div>
                                </div>
                                <div className="timeline-body">
                                    <h4 className="timeline-title">
                                        <span className="badge">Publié le : 10/05/2022</span>
                                    </h4>
                                    <p>{item.content}</p>
                                    {/* <p className="timeline-subtitle">{item.author}</p> */}
                                    <div className="timeline-icons-bar">
                                        {item.liked_bool ? (
                                            <span className='flex flex-row items-center'>
                                                <AiFillHeart
                                                    className="cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
                                                    onClick={() => this.sendLike(item.key, item.liked_bool, item.disliked_bool)}
                                                />
                                                <span className='number__style'>
                                                    {item.liked}
                                                </span>

                                            </span>
                                        ) : (
                                            <span className='flex flex-row items-center'>
                                                <AiOutlineHeart
                                                    className="cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
                                                    onClick={() => this.sendLike(item.key, item.liked_bool, item.disliked_bool)}
                                                />
                                                <span className='number__style'>
                                                    {item.liked}
                                                </span>

                                            </span>
                                        )
                                        }
                                        {item.disliked_bool ? (
                                            <span className='flex flex-row items-center'>
                                                <IoIosHeartDislike
                                                    className="cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
                                                    onClick={() => this.sendDislike(item.key, item.liked_bool, item.disliked_bool)}
                                                />
                                                <span className='number__style'>
                                                    {item.disliked}
                                                </span>
                                            </span>

                                        )
                                            : (
                                                <span className='flex flex-row items-center'>
                                                    <IoHeartDislikeOutline
                                                        className="cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
                                                        onClick={() => this.sendDislike(item.key, item.liked_bool, item.disliked_bool)}
                                                    />
                                                    <span className='number__style'>
                                                        {item.disliked}
                                                    </span>
                                                </span>
                                            )}
                                        {item.comment_bool ? (
                                            <span className='flex flex-row items-center'>
                                                <RiMessage3Fill
                                                    className="cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
                                                    onClick={() => this.displayComSection(key)}
                                                />
                                                <span className='number__style'>
                                                    {item.comments.length}
                                                </span>
                                            </span>
                                        ) : (
                                            <span className='flex flex-row items-center'>
                                                <RiMessage3Line
                                                    className="cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
                                                    onClick={() => this.displayComSection(key)}
                                                />
                                                <span className='number__style'>
                                                    {item.comments.length}
                                                </span>
                                            </span>
                                        )}
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
                                                onChange={(event) => this.changeComment(event, item.key)}
                                                sx={{
                                                    marginLeft: "10px", width: "100%",
                                                    '& .MuiOutlinedInput-notchedOutline': {
                                                        borderRadius: "15px"
                                                    },
                                                    '& .MuiInputBase-root': {
                                                        borderRadius: "15px"
                                                    }
                                                }}

                                            />
                                            <RiSendPlaneFill onClick={() => this.sendComment(item.key)} className='text-[#20B95F] cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 text-3xl ml-2 mr-2' />
                                        </div>
                                    </div>
                                    : ''}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Posts;