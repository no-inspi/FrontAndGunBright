import {useEffect, useState} from 'react'

function Home(props) {
    const gun = props.gun
    const [txt, setTxt] = useState()
    useEffect(() => {
        gun.get('text').once((node) => {
            console.log(node)
            if(node == undefined) {
              gun.get('text').put({text: "Write the text here"})
            } else {
              console.log("Found Node")
              setTxt(node.text)
            }
          })
    }, [])

    const signup = () => {
        console.log("signup")
    }

    const signin = () => {
        console.log("signin")
    }

    return (
    <div>
        Home section {txt} 
        <form>
            <label>Username : </label>
            <input type="text" className='border-2 border-blue-500 mb-5'></input><br></br>
            <label>Password : </label>
            <input type="password" className='border-2 border-blue-500 mb-5'></input><br></br>
            <button type="button" className='bg-emerald-400 border-2 border-white-500 p-3 rounded-xl' onClick={signup}>S'inscrire</button>
            <button type="button" className='bg-emerald-400 border-2 border-white-500 p-3 rounded-xl ml-5' onClick={signin}>Se connecter</button>
        </form>
    </div>)
}

export default Home;