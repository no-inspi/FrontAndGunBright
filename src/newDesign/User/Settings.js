import * as React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios';
import "../../css/mypost.css";
import "../../css/settings.css";
import "../../css/loginv2.css";

import NavBar from '../NavBar';

import { categories } from '../../utils/categories';
import { shortenDate } from '../../utils/shortenDate.js';

import Input from '@mui/material/Input';

import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const COLORSCATEGORIE = ['#cb3c33', '#7633cb', '#51a8da', '#51a8da', '#51a8da', '#51a8da']

export default function Settings(props) {

    const [usernameTamp, setUsernameTamp] = useState("")
    const [connected, setconnected] = useState(false)
    const [postsUser, setPostsUser] = useState([])
    const [firstName, setfirstName] = useState([])
    const [lastName, setlastName] = useState([])
    const [birthDate, setbirthDate] = useState([])
    const [username, setusername] = useState([])
    const [email, setemail] = useState([])

    useEffect(() => {
        const el = document.querySelector(".loader-container");
        if (el) {
            el.remove();
        }
        if (window.sessionStorage.getItem('username')) {
            setUsernameTamp(window.sessionStorage.getItem('username'));
            setconnected(true);
            // axios
            //     .get("http://127.0.0.1:8000/get_all_liked_post_user?user=" + window.sessionStorage.getItem('username'))
            //     .then(response => {
            //         setPostsUser(response.data)
            //     })
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

    const handleFirstNameChange = (event) => {
        setfirstName(event.target.value)
    }
    const handleLastNameChange = (event) => {
        setlastName(event.target.value)
    }

    const handleDateBirthChange = (event) => {
        setbirthDate(event.target.value)
    }
    const handleUsernameChange = (event) => {
        setusername(event.target.value)
    }

    const handleEmailChange = (event) => {
        setemail(event.target.value)
    }

    const handleSubmit = (event) => {
        axios
            .post("http://127.0.0.1:8000/update_user?username=" + window.sessionStorage.getItem('username'), 
            {
                "username": username != "" ? username : null,
                "first_name": firstName != "" ? firstName : null,
                "last_name": lastName != "" ? lastName : null,
                "dateBirth": birthDate != "" ? birthDate : null,
                "email": email != "" ? email : null
            }
            )
            .then(response => {
                console.log(response)
                props.alert.success("Your changes have been saved successfully") 
                setusername("")
                setemail("")
                setfirstName("")
                setlastName("")
                setbirthDate("")
            })
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
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '50px', alignItems: 'center', height: "80vh" }}>
                <div className='post_content_container settings_container'>
                    <h1 className='settings_title'>Settings</h1>
                    <div className='input_container_settings'>
                        <Input
                            placeholder="First name"
                            sx={{
                                color: 'white',
                                ':before': { borderBottomColor: 'white' }
                            }}
                            color="primary"
                            onChange={handleFirstNameChange}
                            value={firstName}

                        />
                        <Input
                            placeholder="Last name"
                            sx={{
                                color: 'white',
                                ':before': { borderBottomColor: 'white' }
                            }}
                            color="primary"
                            onChange={handleLastNameChange}
                            value={lastName}
                        />
                        <Input
                            placeholder="DateBirth"
                            sx={{
                                color: 'white',
                                ':before': { borderBottomColor: 'white' }
                            }}
                            color="primary"
                            type="text"
                            onChange={handleDateBirthChange}
                            value={birthDate}
                        />
                        <Input
                            placeholder="Username"
                            sx={{
                                color: 'white',
                                ':before': { borderBottomColor: 'white' }
                            }}
                            color="primary"
                            type="text"
                            onChange={handleUsernameChange}
                            value={usernameTamp}
                            readOnly={true}
                        />
                        <Input
                            placeholder="Email Address"
                            sx={{
                                color: 'white',
                                ':before': { borderBottomColor: 'white' }
                            }}
                            color="primary"
                            type="email"
                            onChange={handleEmailChange}
                            value={email}
                        />
                    </div>
                    <div className='settings_button'>
                        <button className='login_button button_white gotobraight_button' onClick={handleSubmit}> Update </button>
                    </div>
                </div>
            </div>
        </div>
    )
}