import "../css/latestNews.css";
import {useEffect, useState} from 'react';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';

import { ArrowCircleLeft } from "@mui/icons-material";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "#303030", padding: 2, width: "30px", height: "30px", borderRadius: "20px", paddingLeft: "2px", paddingTop: "6px"}}
            onClick={onClick}
        >
            <ArrowCircleLeft />
        </div>
    );
}

const LatestNews = () => {

    const [topPost, setTopPost] = useState([]);
    const [trendingPost, setTrendingPost] = useState([]);
    const [newPost, setNewPost] = useState([]);

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

    const settings = {
        infinite: true,
        speed: 200,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        centerPadding: '20px',
        centerMode: true,
        autoplay: false,
        speed: 1000,
        autoplaySpeed: 5000,
        cssEase: "ease-in-out",
        prevArrow: <SamplePrevArrow />,
        initialSlide: 1,
        pauseOnHover: true
    };

    useEffect(() => {
        const numberofrandompost = 4
        var posts = []
        var trendingpost = []
        var newpost = []

        axios
            .get("https://mainapibase-trovu5k74a-ew.a.run.app/get_first_liked_post")
            .then(response => {
                posts = response.data
                console.table(posts)
                setTopPost(posts)
            })
        
            axios
            .get("https://mainapibase-trovu5k74a-ew.a.run.app/get_random_post?numberofpost="+numberofrandompost)
            .then(response => {
                trendingpost = response.data
                console.table(trendingpost)
                setTrendingPost(trendingpost)
            })

            axios
            .get("https://mainapibase-trovu5k74a-ew.a.run.app/get_random_post?numberofpost="+numberofrandompost)
            .then(response => {
                newpost = response.data
                console.table(newpost)
                setNewPost(newpost)
            })
            
        
    }, [])

    return (
        <Box sx={{ position: 'fixed', width: "22%", right: "0", top: "90px", bottom: 0 }} className="news-container">
            <Box className="news_idk">
                <Box className="news_title">
                    Top
                </Box>
                <Slider {...settings} className="news_slider">
                    {topPost.map((post) => {
                        return (
                            <div>
                                <div className="news_card">{post.title}</div>
                            </div>
                        )
                    })}
                    {/* <div>
                        <div className="news_card">Lorem ipsum dolor sit amet consectetur adipisicing elitLorem ipsum dolor sit amet consectetur adipisicing elitLorem ipsum dolor sit amet consectetur adipisicing elitLorem ipsum dolor sit amet consectetur adipisicing elitLorem ipsum dolor sit amet consectetur adipisicing elit</div>
                    </div>
                    <div>
                        <div className="news_card">Maxime mollitia,molestiae</div>
                    </div>
                    <div>
                        <div className="news_card">odit fugiat iusto fuga praesentiumoptio</div>
                    </div>
                    <div>
                        <div className="news_card">4</div>
                    </div> */}
                </Slider>
                {/* <Box className="news_slider">
                    <Box className="news_card">
                        Post title that can be short or long, it looks like whe ...
                    </Box>
                    <Box className="news_card">
                        Post title that can be short or long, it looks like whe ...
                    </Box>
                </Box> */}
            </Box>
            <Box className="news_idk">
                <Box className="news_title" style={{ color: "#7633cb" }}>
                    Trending
                </Box>
                <Slider {...settings} className="news_slider">
                {trendingPost.map((post) => {
                        return (
                            <div>
                                <div className="news_card">{post.title}</div>
                            </div>
                        )
                    })}

                    {/* <div>
                        <div className="news_card">1</div>
                    </div>
                    <div>
                        <div className="news_card">2</div>
                    </div>
                    <div>
                        <div className="news_card">3</div>
                    </div>
                    <div>
                        <div className="news_card">4</div>
                    </div> */}
                </Slider>
            </Box>
            <Box className="news_idk">
                <Box className="news_title" style={{ color: "#ba3931" }}>
                    New
                </Box>
                <Slider {...settings} className="news_slider">
                {newPost.map((post) => {
                        return (
                            <div>
                                <div className="news_card">{post.title}</div>
                            </div>
                        )
                    })}
                    {/* <div>
                        <div className="news_card">1</div>
                    </div>
                    <div>
                        <div className="news_card">2</div>
                    </div>
                    <div>
                        <div className="news_card">3</div>
                    </div>
                    <div>
                        <div className="news_card">4</div>
                    </div> */}
                </Slider>
            </Box>
        </Box>
    )
}

export default LatestNews;