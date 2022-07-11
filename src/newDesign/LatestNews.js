import "../css/latestNews.css";

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

const LatestPost = [
    {
        author: "Padaqore",
        date: "17/06/2022",
        content: "A post from charlie"
    },
    {
        author: "Padaqore",
        date: "15/06/2022",
        content: "Encore un post from charlie"
    },
    {
        author: "BoumizLeSang",
        date: "12/06/2022",
        content: "Ca fait beaucoup là nan ?"
    },
    {
        author: "Yvan",
        date: "06/06/2022",
        content: "Et comme par hasard !"
    },
    {
        author: "AlexandraAKALaFolle",
        date: "01/06/2022",
        content: "MARC JE T'AIME !!!"
    },
    {
        author: "Marc",
        date: "16/05/2022",
        content: "Je pense qu'il est un peu trop tôt pour faire un choix mais mon choix est fait"
    },
]

const LatestNews = () => {

    function stringToColor(string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }


    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}`,
        };
    }

    return (
        <Box sx={{ position: 'fixed', width: "22%", right: "1.5%", top: "90px" }} className="news-container">
            <Box sx={{ borderBottom: "1px solid #e9edf4" }} className="news-title">
                Latest Founder's Posts
            </Box>
            <Box className="news-posts-container">
                {LatestPost.map(post => {
                    return (
                        <Box className="news-post" >
                            <Avatar {...stringAvatar(post.author)} />
                            
                            <div className="post-content">
                                <div>{post.author}</div>
                                <div>{post.date}</div>
                                <div>{post.content}</div>
                            </div>
                        </Box>
                    )
                })}
                {/* <Box className="news-post" >
                    <div>
                        <Avatar {...stringAvatar('Padaqore')} />
                    </div>
                    <div className="post-content">
                        <div>Padaqore</div>
                        <div>17/06/2022</div>
                        <div>A post from charlie, one founder</div>
                    </div>
                </Box>
                <Box className="news-post">
                    <div>
                        <Avatar {...stringAvatar('UnIencli')} />
                    </div>
                    <div className="post-content">
                        <div>UnIencli</div>
                        <div>17/06/2022</div>
                        <div>A post from charlie, one founder</div>
                    </div>
                </Box> */}
            </Box>

        </Box>
    )
}

export default LatestNews;