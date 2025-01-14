import './App.css';
import Gun from 'gun/gun'
import Sea from 'gun/sea'
import {useEffect, useState} from 'react'
import './components/Home';
import Home from './components/Home';
import Home2 from './newDesign/Home';
import Login from './newDesign/Login';
import SignUp from './newDesign/SignUp';
import { useAlert } from "react-alert";
import React, { Component }  from 'react';
import { Routes, Route } from "react-router-dom";

// ADMIN
import AdminHome from './newDesign/AdminPanel/AdminHome';
import AdminLogin from './newDesign/AdminPanel/AdminLogin';
import GestionPost from './newDesign/AdminPanel/GestionPost';

//Test
import ImageUploader from './newDesign/ImageUploader';

//users
import MyPost from './newDesign/myPost/MyPost';
import LikedPost from './newDesign/myPost/LikedPost';
import Settings from './newDesign/User/Settings';

// LandingPage
import LandingPage from './newDesign/Landing/landingPage'

const gun = Gun()


function App() {
  const alert = useAlert();
  return (
    <div className="App">
      {/* <Home id="mainHome" gun={gun} alert={alert}/> */}
      <Routes>
        <Route path="/" element={<Home2 gun={gun} alert={alert}/>} />
        <Route path="/home" element={<LandingPage gun={gun} alert={alert}/>} />
        {/* <Route path="/" element={<Home id="mainHome" gun={gun} alert={alert}/>} /> */}
        <Route path="/login" element={<Login gun={gun} alert={alert}/>}/>
        <Route path="/signup" element={<SignUp gun={gun} alert={alert}/>}/>
        <Route path="/admin" element={<AdminHome alert={alert}/>}/>
        <Route path="/admin/login" element={<AdminLogin alert={alert}/>}/>
        <Route path="/admin/test" element={<ImageUploader alert={alert}/>}/>
        <Route path="/admin/gestionpost" element={<GestionPost alert={alert}/>}/>
        <Route path="/user/mypost" element={<MyPost alert={alert}/>}/>
        <Route path="/user/likedpost" element={<LikedPost alert={alert}/>}/>
        <Route path="/user/settings" element={<Settings alert={alert}/>}/>
      </Routes>
    </div>
    
  );
}

export default App;
