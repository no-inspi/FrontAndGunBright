import './App.css';
import Gun from 'gun/gun'
import Sea from 'gun/sea'
import {useEffect, useState} from 'react'
import './components/Home';
import Home from './components/Home';
import { useAlert } from "react-alert";

const gun = Gun({
  peers: ['http:localhost:8000/gun']
})


function App() {
  const alert = useAlert();
  return (
    <div className="App">
      <Home id="mainHome" gun={gun} alert={alert}/>
    </div>
    
  );
}

export default App;
