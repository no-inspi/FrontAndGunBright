import * as React from 'react';
import { useState,useEffect } from 'react'
import axios from 'axios';

import NavBar from '../NavBar';

import { categories } from '../../utils/categories';

export default function MyPost(props) {

    const [usernameTamp, setUsernameTamp] = useState("")
    const [connected, setconnected] = useState(false)

    useEffect(() => {
        const el = document.querySelector(".loader-container");
        if (el) {
            el.remove();
        }
        if (window.sessionStorage.getItem('username')) {
        setUsernameTamp(window.sessionStorage.getItem('username'));
        setconnected(true);
        axios
                .get("http://127.0.0.1:8000/get_all_post_user?user="+window.sessionStorage.getItem('username'))
                .then(response => {
                    console.log(response)
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
            test
        </div>
    )
}