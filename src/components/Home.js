import React, { Component } from 'react';
import Gun from 'gun/gun'
import Sea from 'gun/sea'
import { useAlert } from 'react-alert'
import _ from 'lodash';

// icons
import { FaBeer, FaEthereum, FaBitcoin } from 'react-icons/fa';
import { AiFillLike, AiFillDislike, AiOutlineComment, AiFillCar } from 'react-icons/ai';
import { SiHiveBlockchain } from 'react-icons/si';
import { GiShinyPurse } from 'react-icons/gi';
// material
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// icons
import SearchIcon from '@mui/icons-material/Search';
import DoneAllIcon from '@mui/icons-material/DoneAll';


// personnal style
import "../css/navigation.css";
import "../css/timeline.css";
import "../css/header.css";
import favicon from '../images/favicon.png';

class Home extends Component {
    //const alert = useAlert()

    constructor({ gun }) {
        super()
        this.gun = gun;
        this.userG = gun.user().recall({ sessionStorage: true })
        this.alert = useAlert
        this.colorStr = ['danger', 'success', 'info']

        this.state = { txt: '', username: '', password: '', message: '', post: [], connected: false, listBoolComment: [], listColorStr: [], SignIn: true };
    }

    componentDidMount() {
        let post_tmp = this.state.post;
        var user = this.gun.get('users').get("@PsychoLlama");
        const self = this;
        this.gun.get('posts').map().on((post, key) => {
            if (post == undefined) {
                console.log('error')
            } else {
                console.log("Found post, enter", post.content, key)
                //setPost([post.content])
                const merged = _.merge({ 'key': key }, _.pick(post, ['content', 'key']));
                const index = _.findIndex(post_tmp, (o) => { return o.key === key });
                if (index < 0) {
                    post_tmp.push({ 'content': post.content, 'key': key })
                }
                else {
                    post_tmp[index] = merged
                }

            }
            self.setState({ post_tmp })
        }, [])
        // Generate random color for timeline
        console.log('length: ', post_tmp.length, Math.floor(Math.random() * 3))
        let listColorTmp = []
        for (var i = 0; i < post_tmp.length; i++) {
            let int_tamp = Math.floor(Math.random() * 3)
            listColorTmp.push(this.colorStr[int_tamp])
            console.log(listColorTmp)
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

    onMessageChange = (event) => {
        // this.state.message = event.target.value
        this.setState({ message: event.target.value })
        console.log('onmessagechange test', event.target.value)
    }

    signup = () => {
        if (this.state.username && this.state.password) {
            this.userG.create(this.state.username, this.state.password, function (ack) {
                console.log(ack)
                if (ack.err) {
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

            this.userG.auth(this.state.username, this.state.password, function (at) {
                if (at.err) {
                    // alert.error(at.err)
                }
                else if (at.id) {
                    // alert.success('User correctly connected')
                    // this.state.connected = true
                    self.setState({ connected: true })
                    self.forceUpdate();
                    self.componentDidMount()
                }
            })
        }
    }

    getData = () => {
        console.log('Post display :', this.state.post)
        this.userG.get('post').once(function (data, key) {
            console.log('dataPost : ', key, data)
        })
    }

    putData = () => {
        this.userG.get('post').put({ content: "Charlie test 0" });
    }

    sendMsg = () => {
        // this.userG.get('posts').get("test2").put({content: this.state.message});
        console.log('test send msg')
        const self = this;
        var user = this.gun.get('users').get("@PsychoLlama");
        var contentToInsert = {
            title: this.state.message+" title",
            slug: this.state.message+"-slug",
            content: this.state.message
        };
        var contentToInsertPost = this.gun.get('posts').get(contentToInsert.slug).put(contentToInsert);
        contentToInsertPost.get('author').put(user).get('posts').set(contentToInsertPost);
        console.log('done send msg')
        self.componentDidMount()
    }

    sendLike = () => {
        console.log('like')
    }

    sendDislike = () => {
        console.log('Dislike')
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

        console.log('initial data completed')

    }

    GetInitialData = () => {
        console.log('getdata')
        var mark = this.gun.get('users').get("@PsychoLlama");
        var post = this.gun.get('posts').get("lorem-ipsum-dolor-jesse")
        console.log(mark)
        this.gun.get('posts').once(function (data, key) {
            console.log('User : ', key, data)
        })
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
                        <span className='navigation__title__content'>Bright</span>
                        <span className='navigation__title__secondary'>New generation social network</span>
                        {this.state.connected ? ''

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
                                        }} />
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
                                        }} />
                                        <Button variant="contained" sx={{
                                            color: 'white',
                                            width: 150,
                                            maxWidth: 150,
                                            backgroundColor: '#20B95F',
                                            mt: '0.75rem',
                                            borderRadius: 50,
                                        }}>
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
                                        }} />
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
                                        }} />
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
                                        }} />
                                        <Button variant="contained" sx={{
                                            color: 'white',
                                            width: 150,
                                            maxWidth: 150,
                                            backgroundColor: '#20B95F',
                                            mt: '0.75rem',
                                            borderRadius: 50,
                                        }}>
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
                            <span>Stocks</span>
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
                    <div class="container">
                        <div class="timeline">
                            {this.state.post.map((item, key) => {
                                return (
                                    <div class={`timeline-container ${this.state.listColorStr[key]}`}>
                                        <div class="timeline-icon">
                                            <div class="timeline__icon__space"><FaEthereum /></div>
                                        </div>
                                        <div class="timeline-body">
                                            <h4 class="timeline-title"><span class="badge">{this.state.listColorStr[key]}</span></h4>
                                            <p>{item.content}</p>
                                            <p class="timeline-subtitle">1 Hours Ago</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <br></br>
                    <Button variant="contained" onClick={this.GetInitialData}>GetData</Button><br></br>
                    <Button variant="contained" onClick={this.PutInitialData}>PutData</Button>
                    {this.state.connected ? ''

                        : <div className='fixed mt-5 right-24 flex flex-col bg-blue-900 p-5 rounded shadow-lg shadow-indigo-400/50 text-white' style={{ "width": '20vw' }}>
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
                                        <input type="password" placeholder='Your last name ...' className='border-2 mt-2 border-slate-300 text-black focus:border-emerald-400 focus:ring-emerald-400 focus:ring-1 focus:outline-none rounded p-2 caret-blue-900 placeholder:italic placeholder:text-slate-400 mb-5 ' style={{ "width": "100%" }}></input>
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <label>First Name </label>
                                    <div className='flex flex-row justify-center'>
                                        <input type="password" placeholder='Your firt name ...' className='border-2 mt-2 ml-3 border-slate-300 text-black focus:border-emerald-400 focus:ring-emerald-400 focus:ring-1 focus:outline-none rounded p-2 caret-blue-900 placeholder:italic placeholder:text-slate-400 mb-5 ' style={{ "width": "100%" }}></input>
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-row justify-center'>
                                <button type="button" className='bg-emerald-700 border-2 text-white border-white-500 p-3 rounded-xl w-2/4' onClick={this.signup}>Sign up</button>
                            </div>

                        </div>
                    }
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

            </div>)
    }
}

export default Home;