import { useEffect, useState } from 'react';

import axios from 'axios';
import '../../css/gestionpost.css';
import NavBar from '../NavBar';

import CloseIcon from '@mui/icons-material/Close';

const GestionPost = (props) => {
    const [loading, setLoading] = useState(true)
    const [posts, setPost] = useState([])

    useEffect(() => {
        const el = document.querySelector(".loader-container");
        if (el) {
            el.remove();
            setLoading(!loading);
        }
        else {
            setLoading(false);
        }

        var posts = []
        axios
            .get("https://mainapibase-trovu5k74a-ew.a.run.app/get_posts?search=")
            .then(response => {
                posts = response.data
                console.table(posts)
                setPost(posts)
            })

    }, [])
    if (loading) {
        return null;
    }

    const delete_images = (nomimg) => {
        axios
            .get("https://mainapibase-trovu5k74a-ew.a.run.app/delete_image_by_id?nomimg="+nomimg)
            .then(response => {
              console.log(response)
            })
    }

    return (
        <div>
            <NavBar
                usernameTamp={window.sessionStorage.getItem('username')}
                // setConnectedFromChild={setConnectedFromChild}
                connected={true}
            // alert={alert}
            // categorie={categorie}
            // setCategorie={setCategorie}
            />
            <div className='flex_container_gestionpost'>
                {posts.map((post) => {
                    return (
                        <div className='globalpost_container'>
                            <div className='gestionpost_container'>
                                <div>
                                    {post.title}
                                </div>
                                <div>
                                    {post.content}
                                </div>
                                <div>
                                    {post.img_list.length > 0 ? (
                                        <div style={{ marginTop: 15 }}>
                                            {/* <img src={require=(post.img_list[0].nomimg)}/> */}
                                            <img src={require=('../'+post.img_list[0].nomimg)}/>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                            <div className='button_delete_container'>
                                <div className='button_delete btn_red'>
                                    <CloseIcon />delete post
                                </div>
                                <div className='button_delete' onClick={() => delete_images(post.img_list[0].nomimg)}>
                                    <CloseIcon />delete image
                                </div>
                                  
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default GestionPost;