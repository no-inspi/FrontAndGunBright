import { useEffect, useState } from 'react'
import axios from 'axios'

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

// icons
import PersonIcon from '@mui/icons-material/Person';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ArticleIcon from '@mui/icons-material/Article';
import FavoriteIcon from '@mui/icons-material/Favorite';

import '../../css/AdminPanel/card.css';

// charts
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const data = [
    { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 200, pv: 2400, amt: 2400 },
    { name: 'Page C', uv: 550, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 200, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 350, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 350, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 350, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 350, pv: 2400, amt: 2400 },
];

const AdminStatsG = () => {
    const [statsG, setStatsG] = useState([])
    const [last5Post, setLast5Post] = useState([])
    const [loading, setLoading] = useState(true)

    function fakeRequest() {
        return new Promise(resolve => setTimeout(() => resolve(), 2500));
    }

    useEffect(() => {

        // const el = document.querySelector(".loader-container");
        // if (el) {
        //     el.remove();
        //     
        // }

        axios
            .get("http://127.0.0.1:8000/get_metrics_admin_statsG")
            .then(response => {
                setStatsG(response.data)
            })

        axios
            .get("http://127.0.0.1:8000/get_metrics_admin_last_5?number=5")
            .then(response => {
                setLast5Post(response.data)
                console.log(response.data)
            })
        setLoading(false);
    }, []);

    return (
        <div>
            {loading ? (
                <div>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={true}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </div>
            ) : (
                <Grid container spacing={4} className="admin_container">
                    <Grid item xs={3}>
                        <div className='card_statsG'>
                            <h6 className='card_title'>
                                Utilisateurs
                            </h6>
                            <h2 className='card_metrics'>
                                <div>{statsG.user}</div>
                                <div className='card_icon'><PersonIcon sx={{ fontSize: 50 }} /></div>
                            </h2>
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div className='card_statsG'>
                            <h6 className='card_title'>
                                Posts
                            </h6>
                            <h2 className='card_metrics'>
                                <div>{statsG.posts}</div>
                                <div className='card_icon'><ArticleIcon sx={{ fontSize: 50 }} /></div>
                            </h2>
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div className='card_statsG'>
                            <h6 className='card_title'>
                                Commentaires
                            </h6>
                            <h2 className='card_metrics'>
                                <div>{statsG.comments}</div>
                                <div className='card_icon'><ChatBubbleIcon sx={{ fontSize: 50 }} /></div>
                            </h2>
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div className='card_statsG'>
                            <h6 className='card_title'>
                                Likes/Dislikes
                            </h6>
                            <h2 className='card_metrics'>
                                <div>{statsG.like}/{statsG.dislike}</div>
                                <div className='card_icon'><FavoriteIcon sx={{ fontSize: 50 }} /></div>
                            </h2>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className='card_graph'>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart width={200} height={400} data={data}>
                                    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className='card_statsG'>
                            <h6 className='card_title'>
                                Derniers posts
                            </h6>
                            <h2 className='card_metrics'>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Content</TableCell>
                                                <TableCell align="right">Author</TableCell>
                                                <TableCell align="right">Date</TableCell>
                                                <TableCell align="right">Likes/Dislikes</TableCell>
                                                <TableCell align="right">Comments</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {last5Post.map((row) => (
                                                <TableRow
                                                    key={row.id_gun}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {row.content.slice(0, 70)}
                                                    </TableCell>
                                                    <TableCell align="right">{row.author}</TableCell>
                                                    <TableCell align="right">{row.since.split(' ')[0] + ' ' + row.since.split(' ')[1].split(':')[0] + ':' + row.since.split(' ')[1].split(':')[1]}</TableCell>
                                                    <TableCell align="right">{row.like}<b> / </b>{row.dislike}</TableCell>
                                                    <TableCell align="right">{row.comments.length}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </h2>
                        </div>
                    </Grid>
                </Grid>
            )}
        </div>
    )
}

export default AdminStatsG;