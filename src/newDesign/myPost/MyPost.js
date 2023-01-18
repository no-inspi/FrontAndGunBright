import * as React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios';
import "../../css/mypost.css";

import NavBar from '../NavBar';

import { categories } from '../../utils/categories';
import { shortenDate } from '../../utils/shortenDate.js';

const COLORSCATEGORIE = ['#cb3c33', '#7633cb', '#51a8da', '#51a8da', '#51a8da', '#51a8da']

export default function MyPost(props) {

    const [usernameTamp, setUsernameTamp] = useState("")
    const [connected, setconnected] = useState(false)
    const [postsUser, setPostsUser] = useState([])

    useEffect(() => {
        const el = document.querySelector(".loader-container");
        if (el) {
            el.remove();
        }
        if (window.sessionStorage.getItem('username')) {
            setUsernameTamp(window.sessionStorage.getItem('username'));
            setconnected(true);
            axios
                .get("http://127.0.0.1:8000/get_all_post_user?user=" + window.sessionStorage.getItem('username'))
                .then(response => {
                    setPostsUser(response.data)
                })
        }
        else {
            console.log("not connected")
        }
    })

    const setConnectedFromChild = (booleanVar) => {
        setconnected(booleanVar)
    }

    const setCategorie = (valuerandom) => {
        console.log(valuerandom)
        window.location = "http://localhost:3000/"
    }

    return (
        <div>
            <NavBar
                usernameTamp={usernameTamp}
                setConnectedFromChild={setConnectedFromChild}
                connected={connected}
                alert={alert}
                setCategorie={setCategorie}
            />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '50px', alignItems: 'center' }}>
                {postsUser.map((post) => {
                    return (
                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', gap: '50px', justifyContent: 'center', alignItems: 'center' }}>
                            <div className='post_container'>
                                <div className='post_title_container'>
                                    <div className='post_title'>
                                        {post.title}
                                    </div>
                                    <div className='post_date'>
                                        {shortenDate(post.since)}
                                    </div>
                                </div>
                                <div className='post_categories_container'>
                                    {post.categories_list.map((itemBis, index) => {
                                        return (
                                            <div className='post_categories' style={{ backgroundColor: COLORSCATEGORIE[index] }}>
                                                #{itemBis.name}
                                            </div>

                                        )
                                    })}
                                </div>
                                <div className='post_content_container'>
                                    {post.content}

                                    {post.img_list.length > 0 ? (
                                        <div style={{ marginTop: 15 }}>
                                            <img src={post.img_list[0].nomimg} />
                                        </div>
                                    ) : null}
                                </div>

                                {/* <div className='post_icons_container'>
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
                                                    onClick={() => handleClickOpen(item.comments, item.content, item.id_gun, item.categories_list, shortenDate(item.since))}
                                                />
                                            ) : (
                                                <RiMessage3Line
                                                    className="ml-5 icon-size-footer"
                                                    onClick={() => handleClickOpen(item.comments, item.content, item.id_gun, item.categories_list, shortenDate(item.since))}
                                                />
                                            )
                                            }
                                        </Badge>
                                    </div> */}
                            </div>
                            <div className='stats_post_container'>
                                <div>
                                    <span className='title_metrics'> Views </span> : {post.vues}
                                </div>
                                <div>
                                    <span className='title_metrics'> Likes </span> : {post.like}
                                </div>
                                <div>
                                    <span className='title_metrics'> DisLikes </span> : {post.dislike}
                                </div>
                                <div>
                                    <span className='title_metrics'> Comments </span> : {post.comments.length}
                                </div>
                            </div>
                        </div>

                    )
                })}
            </div>
        </div>
    )
}