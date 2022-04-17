import {useEffect, useState} from 'react'
import Gun from 'gun/gun'
import Sea from 'gun/sea'
import { useAlert } from 'react-alert'
import _ from 'lodash';

function Home(props) {
    const alert = useAlert()

    const gun = props.gun
    const userG = gun.user().recall({sessionStorage: true})

    const [txt, setTxt] = useState()
    const [username,setUsername] = useState()
    const [password,setPassword] = useState()
    const [message,setMessage] = useState()
    const [post, setPost] = useState([])

    const [connected, setConnected] = useState(false)
    


    useEffect(() => {
        let post_tmp = post
        userG.get('post').on((post,key) => {
            console.log(post)
            if(post == undefined) {
              console.log('error')
            } else {
              console.log("Found post, enter",post)
              setPost([post.content])
            }
        })
        
        
        if (userG.is) {
            console.log('You are logged in');
            setConnected(true)
         } else {
            console.log('You are not logged in');
            setConnected(false)
         }

        // userG.get('post').on((node) => {
        //     console.log("Receiving Update")
        //     console.log(node)
        //     setTxt(node.text)
        //     setPost([node.content])
        //   })
        // let posts = post
        // userG.get('post').once(function(data, key) {
        //     console.log('data in useeffect : ',data.content)
        //     posts.push(data.content) 
        // })
        // setPost(posts) 
    }, [])

    const onUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const onMessageChange = (event) => {
        setMessage(event.target.value)
    }

    const signup = () => {
        if (username && password) {
            userG.create(username,password, function(ack) {
                console.log(ack)
                if(ack.err) {
                    alert.error(ack.err)
                }
                else {
                    alert.success('User correctly created ! Welcome Boubacar !')
                }
            })
        }
    }

    const signin = () => {
        if (username && password) {
            //Id : charlietest password1234567890
            userG.auth(username,password, function(at) {
                if(at.err) {
                    alert.error(at.err)
                }
                else if (at.id) {
                    alert.success('User correctly connected')
                    setConnected(true)
                }
            })
        }
    }

    const getData = () => {
        console.log('Post display :',post)
        userG.get('post').once(function(data, key) {
            console.log('dataPost : ',key, data)
        })
    }

    const putData = () => {
       userG.get('post').put({content: "Charlie test 0"});
    }

    const sendMsg = () => {
        userG.get('posts').get("test2").put({content: message});
        
    }

    return (
    <div>
        Home section
        {connected ? ''
        
        : <form>
        <label>Username : </label>
        <input type="text" className='border-2 border-blue-500 mb-5' onChange={onUsernameChange}></input><br></br>
        <label>Password : </label>
        <input type="password" className='border-2 border-blue-500 mb-5' onChange={onPasswordChange}></input><br></br>
        <button type="button" className='bg-emerald-400 border-2 border-white-500 p-3 rounded-xl' onClick={signup}>S'inscrire</button>
        <button type="button" className='bg-emerald-400 border-2 border-white-500 p-3 rounded-xl ml-5' onClick={signin}>Se connecter</button>
        <button type="button" className='bg-emerald-400 border-2 border-white-500 p-3 rounded-xl ml-5' onClick={getData}>get</button>
        <button type="button" className='bg-emerald-400 border-2 border-white-500 p-3 rounded-xl ml-5' onClick={putData}>put</button>
    </form> }
        <form className='mt-5'>
            <label>Your message : </label>
            <input className='border-2 border-blue-500 mb-5' type="text" onChange={onMessageChange} value={message}></input><br></br>
            <button type="button" className='bg-emerald-400 border-2 border-white-500 p-3 rounded-xl ml-5' onClick={sendMsg}>Send message</button>
        </form>
        
        {post.map((item,key)=>{
            return(
                <div>{item}</div>
            )
        })}
    </div>)
}

export default Home;