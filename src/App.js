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

  const [txt, setTxt] = useState()

  useEffect(() => {
    //gun.user().create('charlietest','password1234567890')
    gun.get('text').once((node) => {
      console.log(node)
      if(node == undefined) {
        gun.get('text').put({text: "Write the text here"})
      } else {
        console.log("Found Node")
        setTxt(node.text)
      }
    })

    gun.get('text').on((node) => {
      console.log("Receiving Update")
      console.log(node)
      setTxt(node.text)
    })
  }, [])

  const updateText = (event) => {
    console.log("Updating Text")
    console.log(event.target.value)
    gun.get('text').put({text: event.target.value})
    setTxt(event.target.value)
  }

  return (
    <div className="App">
      <h1 className='bg-white'>Collaborative Document With GunJS</h1>
      <textarea value = {txt} onChange = {updateText} className="bg-blue text-black border-2 border-blue-600"/>
      <Home gun={gun}/>
    </div>
    
  );
}

export default App;
