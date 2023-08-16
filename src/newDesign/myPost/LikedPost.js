import * as React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios';
import "../../css/mypost.css";

import NavBar from '../NavBar';

import { categories } from '../../utils/categories';
import { shortenDate } from '../../utils/shortenDate.js';

const COLORSCATEGORIE = ['#cb3c33', '#7633cb', '#51a8da', '#51a8da', '#51a8da', '#51a8da']

export default function LikedPost(props) {

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
                .get("https://mainapibase-trovu5k74a-ew.a.run.app/get_all_liked_post_user?user=" + window.sessionStorage.getItem('username'))
                .then(response => {
                    setPostsUser(response.data)
                })
        }
        else {
            console.log("not connected")
        }
    }, [])

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