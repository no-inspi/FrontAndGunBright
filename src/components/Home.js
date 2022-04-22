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
        this.setState({message:""})
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
        {this.state.connected ? ''
        
        :<div className='fixed mt-5 right-24 flex flex-col bg-blue-900 p-5 rounded shadow-lg shadow-indigo-400/50 text-white' style={{"width": '20vw'}}>
        <h1 className='uppercase tracking-widest mt-2 mb-2'><b>Sign in</b></h1>
            <label>Username </label>
            <div className='flex flex-row justify-center'>
                <input type="text" placeholder='Your username' className='border-2 mt-2 border-slate-300 text-black focus:border-emerald-400 focus:ring-emerald-400 focus:ring-1 focus:outline-none rounded p-2 caret-blue-900 placeholder:italic placeholder:text-slate-400 mb-5 ' onChange={this.onUsernameChange}></input>
            </div>
            <label>Password </label>
            <div className='flex flex-row justify-center'>
                <input type="password" placeholder='Your password' className='border-2 mt-2 border-slate-300 text-black focus:border-emerald-400 focus:ring-emerald-400 focus:ring-1 focus:outline-none rounded p-2 caret-blue-900 placeholder:italic placeholder:text-slate-400 mb-5' onChange={this.onPasswordChange}></input><br></br>
            </div>
            <div className='flex flex-row justify-center'>
                <button type="button" className='bg-emerald-700 border-2 text-white border-white-500 p-3 rounded-xl w-2/4' onClick={this.signin.bind(this)}>Sign in</button>
            </div>
            <h1 className='uppercase tracking-widest mt-8 mb-2'><b>Sign up</b></h1>
            <label>Username </label>
            <div className='flex flex-row justify-center'>
                <input type="text" placeholder='Your username ...' className='border-2 mt-2 border-slate-300 text-black focus:border-emerald-400 focus:ring-emerald-400 focus:ring-1 focus:outline-none rounded p-2 caret-blue-900 placeholder:italic placeholder:text-slate-400 mb-5 ' ></input>
            </div>
            <label>Password </label>
            <div className='flex flex-row justify-center'>
                <input type="password" placeholder='Your password ...' className='border-2 mt-2 border-slate-300 text-black focus:border-emerald-400 focus:ring-emerald-400 focus:ring-1 focus:outline-none rounded p-2 caret-blue-900 placeholder:italic placeholder:text-slate-400 mb-5 ' ></input>
            </div>
            <div className='flex flex-row justify-center'>
                <div className='flex flex-col'>
                    <label>Last Name </label>
                    <div className='flex flex-row justify-center'>
                        <input type="password" placeholder='Your last name ...' className='border-2 mt-2 border-slate-300 text-black focus:border-emerald-400 focus:ring-emerald-400 focus:ring-1 focus:outline-none rounded p-2 caret-blue-900 placeholder:italic placeholder:text-slate-400 mb-5 ' style={{"width":"100%"}}></input>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <label>First Name </label>
                    <div className='flex flex-row justify-center'>
                        <input type="password" placeholder='Your firt name ...' className='border-2 mt-2 ml-3 border-slate-300 text-black focus:border-emerald-400 focus:ring-emerald-400 focus:ring-1 focus:outline-none rounded p-2 caret-blue-900 placeholder:italic placeholder:text-slate-400 mb-5 ' style={{"width":"100%"}}></input>
                    </div>
                </div>
            </div>

            <div className='flex flex-row justify-center'>
                <button type="button" className='bg-emerald-700 border-2 text-white border-white-500 p-3 rounded-xl w-2/4' onClick={this.signup}>Sign up</button>
            </div>
            
        </div>
        }
        <div className='flex flex-row justify-center mt-5'>
            <div className='bg-blue-900 text-white mt-5 shadow-lg rounded p-5 shadow-indigo-400/50' style={{"width": '30vw'}}>
                <div className='flex flex-col justify-center'>
                    <h1 className='uppercase tracking-widest'> <b>Your post !</b></h1>
                    <div className='flex flex-row justify-center'>
                    <textarea className='border-2 border-slate-300 focus:border-emerald-400 focus:ring-emerald-400 focus:ring-1 focus:outline-none mb-5 rounded text-black mt-2 p-2 caret-blue-900 placeholder:italic placeholder:text-slate-400' placeholder='Send your message ...' rows={5} cols={5} onChange={this.onMessageChange} value={this.state.message} style={{"height":"100px","width":"100%"}}/><br></br>
                    </div>
                    <div className='flex flex-row justify-center'>
                        <button type="button" className='bg-emerald-700 border-2 border-white-500 p-3 rounded-xl ml-5 w-1/2' onClick={this.sendMsg}>Send message</button>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex flex-row justify-center mt-5'>
            <div className='flex flex-col'>
        {this.state.post.map((item,key)=>{
            return(
                <div key={key}>
                    <div className='bg-blue-900 text-white mt-5 shadow-lg rounded-t-lg p-5 shadow-indigo-400/50' style={{"width": '30vw'}}>
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