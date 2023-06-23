import * as React from 'react';
import { useState } from 'react'

import Box from '@mui/material/Box';

import { categories } from '../utils/categories'

export default function CategorieV2(props) {

    const [categorieBool, setCategorieBool] = useState([true, false, false])
    const [categorieDisplay, setCategorieDisplay] = useState(["Crypto", "Stocks", "Politics"])
    const [descriptionDisplay, setDescriptionDisplay] = useState([
        "Recurrent neural network (RNN) models are a type of deep learning model that can be used for time series analysis. RNNs have been shown to excel at capturing long-term dependencies in large datasets, making them ideal for analyzing complex and nonlinear patterns over time. They are adept at predicting future values based on past data points, allowing them to make accurate predictions about trends and cycles in the data. Additionally, they can learn from very small amounts of training data and have been successfully applied to problems such as forecasting stock prices or predicting weather conditions. By leveraging their powerful capabilities, RNNs enable us to gain deeper insights into our data than traditional methods allow.",
        "Deep Learning is a subset of Machine Learning. It uses algorithms to process data and find patterns in it. Deep Learning can be used for Natural Language Processing (NLP) tasks such as text classification, sentiment analysis, or machine translation. For NLP tasks, deep learning models use large amounts of data to learn the features that are important for understanding language. The model then takes these learned features and applies them to new examples of text that it has never seen before in order to make predictions about what words or phrases mean. The advantage of using deep learning for natural language processing is its ability to capture complex relationships between words and meanings which traditional methods may not be able to understand due to their limited capacity. Additionally, deep learning",
        "Autonomous vehicles are the future of personal transportation. They offer a safer and more efficient way to travel, while also reducing traffic congestion and improving fuel economy. Self-driving cars use sensors and advanced algorithms to detect their surroundings in order to navigate safely without human intervention. These systems rely on data from cameras, radar, lidar, GPS, ultrasonic sensors, machine learning algorithms and other technologies to perceive the environment around them. Autonomous vehicles can then interpret this data to make decisions about how best to move through traffic or respond to obstacles in its path. Autonomous vehicles must be trained extensively before they can operate safely on public roads; developers work hard at training these systems using simulations as well as real-world testing with safety drivers onboard for additional"
    ])
    const [allCategorieBool, setAllCategorieBool] = useState(new Array(categories.length).fill(false))

    const updateCategorie = (index, event) => {
        props.setCategorie(event.target.innerText)
        setAllCategorieBool((prev) => prev.map((el, i) => (i == index ? true : false)));
    }

    const handleChangeCategorieTitle = (index) => {
        // let tab_tamp = categorieBool
        // for (let i = 0; i < tab_tamp.length; i++) {
        //     if (i == index) {
        //         tab_tamp[i] = !tab_tamp[i]
        //     }
        //     else {
        //         tab_tamp[i] = false
        //     }
        // }
        // console.log(tab_tamp)
        // setCategorieBool(tab_tamp)
        setCategorieBool((prev) => prev.map((el, i) => (i == index ? true : false)));
    }


    return (
        <Box sx={{ position: 'fixed', width: "22%", left: 0 }} className="categorie_container">
            <Box className="categorie_title">
                {categorieBool.map((item, index) => (
                    item ? categorieDisplay[index] : ''
                ))}
            </Box>
            <Box className="categorie_tabs_container">
                {categorieBool[0] ? (
                    <Box className="categorie_tabs_title title_active" style={{ backgroundColor: "#cb9d33" }} onClick={() => handleChangeCategorieTitle(0)}>
                        Top
                    </Box>
                ) : (
                    <Box className="categorie_tabs_title" onClick={() => handleChangeCategorieTitle(0)}>
                        Top
                    </Box>
                )}

                {categorieBool[1] ? (
                    <Box className="categorie_tabs_title title_active" style={{ backgroundColor: "#7633cb" }} onClick={() => handleChangeCategorieTitle(1)}>
                        Trending
                    </Box>
                ) : (
                    <Box className="categorie_tabs_title" onClick={() => handleChangeCategorieTitle(1)}>
                        Trending
                    </Box>
                )}
                {categorieBool[2] ? (
                    <Box className="categorie_tabs_title title_active" style={{ backgroundColor: "#ba3931" }} onClick={() => handleChangeCategorieTitle(2)}>
                        New
                    </Box>
                ) : (
                    <Box className="categorie_tabs_title" onClick={() => handleChangeCategorieTitle(2)}>
                        New
                    </Box>
                )}
            </Box>
            <Box className="categorie_description">
                {categorieBool.map((item, index) => (
                    item ? descriptionDisplay[index] : ''
                ))}
            </Box>
            <Box className="categorie_list_container">
                <Box className="categorie_list_title_container">
                    <Box className='categorie_list_title'>
                        Other Categories
                    </Box>
                    <Box className='categorie_list_seemore'>
                        <u>See more</u>
                    </Box>
                </Box>
                <div className='categorie_scrollable' id="categorie_scrollable">
                    <Box className='categorie_list' >
                        {categories.map((category, index) => (
                            allCategorieBool[index] ? (
                                <div onClick={(event) => updateCategorie(index,event)} className="categorie categorie_active">
                                    {category}
                                </div>
                            )
                                :
                                (
                                    <div onClick={(event) => updateCategorie(index,event)} className="categorie">
                                        {category}
                                    </div>
                                )
                        ))}

                    </Box>
                </div>
            </Box>
        </Box>
    );
}