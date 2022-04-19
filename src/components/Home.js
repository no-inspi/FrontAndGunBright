import React, {Component} from 'react';
import Gun from 'gun/gun'
import Sea from 'gun/sea'
import { useAlert } from 'react-alert'
import _ from 'lodash';
import { FaBeer } from 'react-icons/fa';
import {AiFillLike,AiFillDislike,AiOutlineComment} from 'react-icons/ai';

class Home extends Component {
    //const alert = useAlert()

    constructor({gun}) {
        super()
        this.gun = gun;
        this.userG = gun.user().recall({sessionStorage: true})
        this.alert = useAlert
        
        this.state = { txt: '', username: '', password: '', message: '', post: [], connected: false, listBoolComment: []};
      }

    componentDidMount() {
        let post_tmp = this.state.post;
        const self = this;
        this.userG.get('posts').map().on((post,key) => {
            console.log(post)
            if(post == undefined) {
              console.log('error')
            } else {
              console.log("Found post, enter",post.content,key)
              //setPost([post.content])
              const merged = _.merge({'key':key},_.pick(post, ['content', 'key']));
              console.log('merged',merged)
              const index = _.findIndex(post_tmp, (o)=>{ return o.key === key});
              console.log(index)
              if(index<0) {
                post_tmp.push({'content':post.content,'key':key})
              }
              else {
                post_tmp[index] = merged
              }
              
            }
            self.setState({post_tmp})
        }, [])
        
        if (this.userG.is) {
            console.log('You are logged in');
            this.setState({connected: true})
         } else {
            console.log('You are not logged in');
            this.setState({connected: false})
         }
    }

    onUsernameChange = (event) => {
    //    this.state.username = event.target.value
       this.setState({username: event.target.value});
    }

    onPasswordChange = (event) => {
        // this.state.password = event.target.value
        this.setState({password: event.target.value});
    }

     onMessageChange = (event) => {
        // this.state.message = event.target.value
        this.setState({message: event.target.value})
    }

     signup = () => {
        if (this.state.username && this.state.password) {
            this.userG.create(this.state.username,this.state.password, function(ack) {
                console.log(ack)
                if(ack.err) {
                   // alert.error(ack.err)
                }
                else {
                   // alert.success('User correctly created ! Welcome Boubacar !')
                }
            })
        }
    }

    signin = (event) => {
        const self = this
        if (this.state.username && this.state.password) {
            //Id : charlietest password1234567890

            this.userG.auth(this.state.username,this.state.password, function(at) {
                if(at.err) {
                   // alert.error(at.err)
                }
                else if (at.id) {
                   // alert.success('User correctly connected')
                    // this.state.connected = true
                    self.setState({connected: true})
                    self.forceUpdate();
                    self.componentDidMount()
                }
            })
        }
    }

    getData = () => {
        console.log('Post display :',this.state.post)
        this.userG.get('post').once(function(data, key) {
            console.log('dataPost : ',key, data)
        })
    }

    putData = () => {
        this.userG.get('post').put({content: "Charlie test 0"});
    }

    sendMsg = () => {
        this.userG.get('posts').get("test2").put({content: this.state.message});
    }

    sendLike = () => {
        console.log('like')
    }

    sendDislike = () => {
        console.log('Dislike')
    }

    displayCom = (index) => {
        let table_tmp = this.state.listBoolComment
        table_tmp[index] = !table_tmp[index]
        this.setState({listBoolComment: table_tmp})
    }

    render() {
        return (
    <div>
        Your post !
        {this.state.connected ? ''
        
        :<div>
        <label>Username : </label>
        <input type="text" className='border-2 border-blue-500 mb-5' onChange={this.onUsernameChange}></input><br></br>
        <label>Password : </label>
        <input type="password" className='border-2 border-blue-500 mb-5' onChange={this.onPasswordChange}></input><br></br>
        <button type="button" className='bg-emerald-400 border-2 border-white-500 p-3 rounded-xl' onClick={this.signup}>S'inscrire</button>
        <button type="button" className='bg-emerald-400 border-2 border-white-500 p-3 rounded-xl ml-5' onClick={this.signin.bind(this)}>Se connecter</button>
        <button type="button" className='bg-emerald-400 border-2 border-white-500 p-3 rounded-xl ml-5' onClick={this.getData}>get</button>
        <button type="button" className='bg-emerald-400 border-2 border-white-500 p-3 rounded-xl ml-5' onClick={this.putData}>put</button>
        </div> }
        <div className='mt-5'>
            <label>Your message : </label>
            <input className='border-2 border-blue-500 mb-5' type="text" onChange={this.onMessageChange} value={this.state.message}></input><br></br>
            <button type="button" className='bg-emerald-400 border-2 border-white-500 p-3 rounded-xl ml-5' onClick={this.sendMsg}>Send message</button>
        </div>
        <div className='flex flex-row justify-center mt-5'>
            <div className='flex flex-col'>
        {this.state.post.map((item,key)=>{
            return(
                <div key={key}>
                    <div className='bg-blue-500 text-white mt-5 shadow-lg rounded-t-lg p-5 shadow-indigo-400/50' style={{"width": '30vw'}}>
                        <div className='text-left'>
                            {item.content}
                        </div>
                    
                        <div className='flex flex-row mt-5 justify-between'>
                            <div className='flex flex-row'>
                                <AiFillLike className='text-white text-2xl mr-2 cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300' onClick={this.sendLike}/> 
                                <AiFillDislike className='text-red-500 text-2xl cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300' onClick={this.sendDislike}/>
                            </div>
                            <div>
                                <AiOutlineComment className='text-white text-2xl cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300' onClick={() => this.displayCom(key)} />
                            </div>
                        </div>
                    </div>
                    {this.state.listBoolComment[key] ?
                    <div className='bg-blue-300 rounded-b-lg'>
                        <div>
                            <span className='text-white'>Your Comment : </span>
                            <input type="text" placeholder='Enter your comment' className='border-2 mr-2 border-blue-600/100 rounded fw-500 p-1 ps-3 my-2 ms-2 h-50 focus:border-white-300/100'></input>
                            <button className='bg-indigo-500 text-white p-2 rounded-full'>Send</button>
                        </div>
                    </div>
                    : ''}
                </div>
                
            )
        })}
            </div>
        </div>
        
    </div>)}
}

export default Home;