import './App.css';
import Gun from 'gun/gun'
import Sea from 'gun/sea'
import {useEffect, useState} from 'react'
import './components/Home';
import Home from './components/Home';

const gun = Gun({
  peers: ['http:localhost:8000/gun']
})


function App() {

  return (
    <div className="App">
      <Home gun={gun}/>
    </div>
    
  );
}

export default App;
