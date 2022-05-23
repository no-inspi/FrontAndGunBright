import React, { Component } from 'react';
import Gun from 'gun/gun'
import Sea from 'gun/sea'
import { useAlert } from 'react-alert'
import _ from 'lodash';
import TestComponent from './TestComponent.js'

// icons
import { FaBeer, FaEthereum, FaBitcoin,FaLeaf,FaFire } from 'react-icons/fa';
import { AiFillLike, AiFillDislike, AiOutlineComment, AiFillCar,AiFillBank } from 'react-icons/ai';
import { SiHiveBlockchain } from 'react-icons/si';
import { GiShinyPurse } from 'react-icons/gi';
import {BsPeopleFill} from 'react-icons/bs';
import {MdSendToMobile} from 'react-icons/md';
import {HiFire} from 'react-icons/hi';
// material
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// icons material
import SearchIcon from '@mui/icons-material/Search';
import DoneAllIcon from '@mui/icons-material/DoneAll';


// personnal style
import "../css/navigation.css";
import "../css/timeline.css";
import "../css/header.css";
import favicon from '../images/favicon.png';

class Home extends Component {
    //const alert = useAlert()

    constructor({ gun,alert }) {
        super()
        this.gun = gun;
        this.userG = gun.user().recall({ sessionStorage: false })
        this.colorStr = ['danger', 'success', 'info']
        this.alert = alert;
        this.state = { 
            txt: '', username: '', 
            password: '', confirmPassword: '', 
            message: '', post: [], 
            connected: false, 
            listBoolComment: [], 
            listColorStr: [], 
            SignIn: true, 
            usernameTamp: "",
            userGunObject : "",  
        };
        // console.log(this.gun.get('users').map());

        console.log("Home gun : ")
        gun.get('users').on(function(data, key){
            console.log(data)
        })


        // console.log("userG:", this.userG)
    }

    componentDidMount() {
        let post_tmp = this.state.post;
        const self = this;
        this.gun.get('posts').map().on((post, key) => {
            if (post == undefined) {
                // console.log('error')
            } else {
                // console.log("Found post, enter", post.content, key)
                //setPost([post.content])

                // get the author
                var author = "";
                var postTmp = self.gun.get('posts').get(key).get('author', function(ack) {
                    if(ack.err){
                        // console.log(ack.err)
                      } else
                      if(!ack.put){
                        // not found
                        // console.log('not found')
                      } else {
                        // data!
                        // console.log("founded: ",ack.put.username)
                        author = ack.put.username
                      }
                });


                
                // console.log("postpm: ",postTmp);
                // postTmp.get('author').once(function (data, keyy) {
                //     console.log('Author : ', keyy, data)
                //     var author = data.username;
                // },[])
                const merged = _.merge({ 'key': key }, _.pick(post, ['content', 'key']), {'author': author});
                // console.log("merged:",merged)
                const index = _.findIndex(post_tmp, (o) => { return o.key === key });
                if (index < 0) {
                    post_tmp.push({ 'content': post.content, 'key': key, 'author': author })
                }
                else {
                    post_tmp[index] = merged
                }

            }
            self.setState({ post_tmp })
        }, [])
        // Generate random color for timeline
        let listColorTmp = []
        for (var i = 0; i < post_tmp.length; i++) {
            let int_tamp = Math.floor(Math.random() * 3)
            listColorTmp.push(this.colorStr[int_tamp])
        }
        this.setState({ listColorStr: listColorTmp })

        // set connection env variable
        if (this.userG.is) {
            console.log('You are logged in');
            this.setState({ connected: true })
        } else {
            console.log('You are not logged in');
            this.setState({ connected: false })
        }
    }

    onUsernameChange = (event) => {
        //    this.state.username = event.target.value
        this.setState({ username: event.target.value });
    }

    onPasswordChange = (event) => {
        // this.state.password = event.target.value
        this.setState({ password: event.target.value });
    }

    onPasswordConfirmChange = (event) => {
        // this.state.password = event.target.value
        this.setState({ confirmPassword: event.target.value });
    }

    onMessageChange = (event) => {
        // this.state.message = event.target.value
        this.setState({ message: event.target.value })
    }

    signup = () => {
        const usernameSignup = this.state.username;
        const passwordSignup = this.state.password;
        const confirmPasswordSignup = this.state.confirmPassword;
        const self = this;

        if (this.state.username && this.state.password && this.state.confirmPassword) {
            // console.log("singup test:",this.state.username,this.state.password,this.state.confirmPassword)
            if (passwordSignup!=confirmPasswordSignup) {
                this.alert.error('Passwords are not the same, please retry')
            } else {
                var userInfo = {
                    username: usernameSignup
                };
        
                var user = this.gun.get('users').get(userInfo.username).put(userInfo);

                this.userG.create(usernameSignup, passwordSignup, function (ack) {
                    // console.log(ack)
                    if (ack.err) {
                        self.alert.error(ack.err)
                    }
                    else {
                        self.alert.success('User correctly created ! Welcome '+usernameSignup+' !')
                        self.setState({username :'',password: '', confirmPassword: ''})
                    }
                })
            }
            
            
        }
    }

    signin = () => {
        const self = this
        const usernameTampSignIn = this.state.username
        if (this.state.username && this.state.password) {
            //Id : charlietest password1234567890

            this.userG.auth(this.state.username, this.state.password, function (at) {
                if (at.err) {
                    self.alert.error(at.err)
                }
                else if (at.id) {
                    self.alert.success('User correctly connected')
                    // this.state.connected = true
                    // console.log("test in sign in ",usernameTampSignIn)
                    console.log("SignIn UserGunObject")
                    var gunUserObject = self.gun.get('users').get(usernameTampSignIn)
                    console.log(gunUserObject)
                    self.setState({ connected: true,usernameTamp: usernameTampSignIn, userGunObject : gunUserObject})
                    self.forceUpdate();
                    self.componentDidMount()
                }
            })
        }
    }

    getData = () => {
        // console.log('Post display :', this.state.post)
        this.userG.get('post').once(function (data, key) {
            // console.log('dataPost : ', key, data)
        })
    }

    putData = () => {
        this.userG.get('post').put({ content: "Charlie test 0" });
    }

    sendMsg = () => {
        // this.userG.get('posts').get("test2").put({content: this.state.message});
        const self = this;
        var user = this.gun.get('users').get(this.state.usernameTamp);
        var contentToInsert = {
            title: this.state.message+" title",
            slug: this.state.message+"-slug",
            content: this.state.message
        };
        var contentToInsertPost = this.gun.get('posts').get(contentToInsert.slug).put(contentToInsert);
        contentToInsertPost.get('author').put(user).get('posts').set(contentToInsertPost);
        this.setState({message: ""})
        let listColorTmp = []
        for (var i = 0; i < this.state.post.length+1; i++) {
            let int_tamp = Math.floor(Math.random() * 3)
            listColorTmp.push(this.colorStr[int_tamp])
        }
        this.setState({ listColorStr: listColorTmp })
    }

    sendLike = (gunKey) => {
        var post = this.gun.get('post').get(gunKey)
        post.get('likes').set(this.state.userGunObject)
        console.log(post.get('likes').map())
    }

    sendDislike = () => {
        // console.log('Dislike')
    }

    displayComSection = (index) => {
        let table_tmp = this.state.listBoolComment
        table_tmp[index] = !table_tmp[index]
        this.setState({ listBoolComment: table_tmp })
    }

    PutInitialData = () => {
        var markInfo = {
            name: "Mark",
            username: "@amark"
        };

        var jesseInfo = {
            name: "Jesse",
            username: "@PsychoLlama"
        };

        var mark = this.gun.get('users').get(markInfo.username).put(markInfo);
        var jesse = this.gun.get('users').get(jesseInfo.username).put(jesseInfo);

        var lipsum = {
            title: "Lorem ipsum dolor",
            slug: "lorem-ipsum-dolor",
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        };

        var lipsumjesse = {
            title: "Lorem ipsum dolor jesse",
            slug: "lorem-ipsum-dolor-jesse",
            content: "Jesse Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        };

        var lipsumPost = this.gun.get('posts').get(lipsum.slug).put(lipsum);
        var lipsumPostJesse = this.gun.get('posts').get(lipsumjesse.slug).put(lipsumjesse);

        lipsumPost.get('author').put(mark).get('posts').set(lipsumPost);
        lipsumPostJesse.get('author').put(jesse).get('posts').set(lipsumPostJesse);

        // console.log('initial data completed')

    }

    GetInitialData = () => {
        // console.log('getdata')
        var mark = this.gun.get('users').get("@PsychoLlama");
        var post = this.gun.get('posts').get("lorem-ipsum-dolor-jesse")
        // post.get('author').once(function (data, key) {
        //     // console.log('User : ', key, data)
        // })
        // console.log("username display : ",this.state.usernameTamp)
    }

    handleChangeSignIn = () => {
        this.setState({ SignIn: !this.state.SignIn })
    }

    render() {
        return (
            <div>
                <div className='navigation'>
                    <div className='navigation__title'>

                        <img src={favicon} />
                        <span className='navigation__title__content'>Bright </span>
                        <span className='navigation__title__secondary'>New generation social network</span>
                        {this.state.connected ? 
                        <div className='navigation__card__login'>
                            <div className="navigation__card__stats">
                                <h3>Social network stats</h3>
                                <div>
                                   <BsPeopleFill /> Users : 5246
                                </div>
                                <div>
                                    <MdSendToMobile/> Posts (24H) : 1528
                                </div>
                                <div>
                                    <MdSendToMobile/> Posts (From start) : 62 923
                                </div>
                            </div>
                        </div>

                            :
                            <div>

                                {this.state.SignIn ?
                                    <div className='navigation__card__login'>
                                        <h4>Login</h4>
                                        <TextField id="outlined-basic" size="small" label="Username" variant="outlined" color="success" sx={{
                                            width: 'auto',
                                            maxWidth: 200,
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderRadius: "150px"
                                            },
                                            '& .MuiInputBase-root': {
                                                borderRadius: "150px"
                                            }
                                        }} 
                                        onChange={this.onUsernameChange}
                                        />
                                        <TextField id="outlined-basic" size="small" label="Password" variant="outlined" color="success" type="password" sx={{
                                            width: 'auto',
                                            maxWidth: 200,
                                            mt: '10px',
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderRadius: "150px"
                                            },
                                            '& .MuiInputBase-root': {
                                                borderRadius: "150px"
                                            }
                                        }} 
                                        onChange={this.onPasswordChange}
                                        />
                                        <Button variant="contained" sx={{
                                            color: 'white',
                                            width: 150,
                                            maxWidth: 150,
                                            backgroundColor: '#20B95F',
                                            mt: '0.75rem',
                                            borderRadius: 50,
                                            
                                        }}
                                        onClick={this.signin}
                                        >
                                            Log In
                                        </Button><br></br>
                                        <Button variant="text" sx={{ mt: "0.50rem", color: "#1d8cf8", letterSpacing: "0.5px" }}
                                            onClick={() => {
                                                this.setState({ SignIn: !this.state.SignIn })
                                            }}>
                                            Join !
                                        </Button>
                                    </div>
                                    :
                                    <div className='navigation__card__login'>
                                        <h4>Join us !</h4>
                                        <TextField id="outlined-basic" size="small" label="Username" variant="outlined" color="success" sx={{
                                            width: 'auto',
                                            maxWidth: 200,
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderRadius: "150px"
                                            },
                                            '& .MuiInputBase-root': {
                                                borderRadius: "150px"
                                            }
                                        }} 
                                        onChange={this.onUsernameChange}
                                        />
                                        <TextField id="Password" size="small" label="Password" variant="outlined" color="success" type="password" sx={{
                                            width: 'auto',
                                            maxWidth: 200,
                                            mt: '10px',
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderRadius: "150px"
                                            },
                                            '& .MuiInputBase-root': {
                                                borderRadius: "150px"
                                            }
                                        }} 
                                        onChange={this.onPasswordChange}
                                        />
                                        <TextField id="PasswordConfirmation" size="small" label="Confirm Password" variant="outlined" color="success" type="password" sx={{
                                            width: 'auto',
                                            maxWidth: 200,
                                            mt: '10px',
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderRadius: "150px"
                                            },
                                            '& .MuiInputBase-root': {
                                                borderRadius: "150px"
                                            }
                                        }} 
                                        onChange={this.onPasswordConfirmChange}
                                        />
                                        <Button variant="contained" sx={{
                                            color: 'white',
                                            width: 150,
                                            maxWidth: 150,
                                            backgroundColor: '#20B95F',
                                            mt: '0.75rem',
                                            borderRadius: 50,
                                        }}
                                        onClick={this.signup}
                                        >
                                            Join <DoneAllIcon className="ml-1" />
                                        </Button>
                                        <Button variant="text" sx={{ mt: "0.50rem", color: "#1d8cf8", letterSpacing: "0.5px" }}
                                            onClick={() => {
                                                this.setState({ SignIn: !this.state.SignIn })
                                            }}>
                                            Log in !
                                        </Button>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                    <div className='navigation__links grid grid-cols-2 gap-4'>
                        <div className='category__title'>
                            Top categories
                        </div>
                        <div className='category__title'>
                            Fire categories
                        </div>
                        <div className='category__card'>
                            <div>
                                <FaEthereum />
                            </div>
                            <span>Crypto</span>
                        </div>
                        <div className='category__card'>
                            <div><AiFillCar /></div>
                            <span>Car</span>
                        </div>
                        <div className='category__card'>
                            <div><SiHiveBlockchain /></div>
                            <span>NFT</span>
                        </div>
                        <div className='category__card'>
                            <div><GiShinyPurse /></div>
                            <div className='icon__fire'><HiFire style={{"marginLeft": "3px", "color": "#DB2222"}}/> <span>(+24%)</span></div>
                            <span>Stocks</span>
                        </div>
                        <div className='category__card'>
                            <div><AiFillBank /></div>
                            <div className='icon__fire'><HiFire style={{"marginLeft": "3px", "color": "#DB2222"}}/> <span>(+72%)</span></div>
                            <span>Politics </span> 
                        </div>
                        <div className='category__card'>
                            <div><FaLeaf /></div>
                            <span>Ecology</span>
                        </div>
                    </div>

                </div>
                <div className='content__page'>
                    <div className="top__header">
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', ml: 10 }}>
                            <TextField id="input-with-sx" label="Type a category..." variant="standard" color="success" />
                            <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5, cursor: 'pointer' }} />
                        </Box>
                    </div>

                    <div className="post__container">
                        <TextField
                            id="filled-multiline-static"
                            label="Type your post here..."
                            multiline
                            rows={3}
                            defaultValue=""
                            // variant="filled"
                            color="success"
                            sx={{ width: "100%" }}
                            onChange={this.onMessageChange}
                        />
                        <Button variant="contained" sx={{
                            color: 'white',
                            width: 'auto',
                            maxWidth: 150,
                            backgroundColor: '#20B95F',
                            mt: '0.75rem',
                            borderRadius: 50,
                            }}
                            onClick={() => {
                                this.sendMsg()
                            }}>
                            Send <DoneAllIcon className="ml-1" />
                        </Button>
                    </div>
                    <div className="container">
                        <div className="timeline">
                            {this.state.post.map((item, key) => {
                                return (
                                    <div className={`timeline-container ${this.state.listColorStr[key]}`}>
                                        <div className="timeline-icon">
                                            <div className="timeline__icon__space"><FaEthereum /></div>
                                        </div>
                                        <div className="timeline-body">
                                            <h4 className="timeline-title">
                                                <span className="badge">Publié le : 10/05/2022</span>
                                            </h4>
                                            <p>{item.content}</p>
                                            <p className="timeline-subtitle">{item.author}</p>
                                            <div className="timeline-icons-bar">
                                                <span><AiFillLike className="cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300" 
                                                onClick={() => this.sendLike(item.key)}/></span>
                                                <span><AiFillDislike className="cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300" 
                                                onClick={() => this.sendLike(item.key)}/></span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <br></br>
                    <Button variant="contained" onClick={this.GetInitialData}>GetData</Button><br></br>
                    <Button variant="contained" onClick={this.PutInitialData}>PutData</Button>
                    {/* <div className='flex flex-row justify-center mt-5'>
                        <div className='bg-blue-900 text-white mt-5 shadow-lg rounded p-5 shadow-indigo-400/50' style={{ "width": '30vw' }}>
                            <div className='flex flex-col justify-center'>
                                <h1 className='uppercase tracking-widest'> <b>Your post !</b></h1>
                                <div className='flex flex-row justify-center'>
                                    <textarea className='border-2 border-slate-300 focus:border-emerald-400 focus:ring-emerald-400 focus:ring-1 focus:outline-none mb-5 rounded text-black mt-2 p-2 caret-blue-900 placeholder:italic placeholder:text-slate-400' placeholder='Send your message ...' rows={5} cols={5} onChange={this.onMessageChange} value={this.state.message} style={{ "height": "100px", "width": "100%" }} /><br></br>
                                </div>
                                <div className='flex flex-row justify-center'>
                                    <button type="button" className='bg-emerald-700 border-2 border-white-500 p-3 rounded-xl ml-5 w-1/2' onClick={this.sendMsg}>Send message</button>
                                </div>
                            </div>0
                        </div>
                    </div> */}
                    <div className='flex flex-row justify-center mt-5'>
                        <div className='flex flex-col'>
                            {/* {this.state.post.map((item, key) => {
                                return (
                                    <div key={key}>
                                        <div className='bg-blue-900 text-white mt-5 shadow-lg rounded-t-lg p-5 shadow-indigo-400/50' style={{ "width": '30vw' }}>
                                            <div className='text-left'>
                                                {item.content}
                                            </div>

                                            <div className='flex flex-row mt-5 justify-between'>
                                                <div className='flex flex-row'>
                                                    <AiFillLike className='text-white text-2xl mr-2 cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300' onClick={this.sendLike} />
                                                    <AiFillDislike className='text-red-500 text-2xl cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300' onClick={this.sendDislike} />
                                                </div>
                                                <div>
                                                    <AiOutlineComment className='text-white text-2xl cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300' onClick={() => this.displayComSection(key)} />
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
                            })} */}
                        </div>
                    </div>
                </div>
                <TestComponent gun={this.gun} />
            </div>)
    }
}

export default Home;