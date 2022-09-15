import * as React from 'react';
import { useState } from 'react'

import Box from '@mui/material/Box';

import { categories } from '../utils/categories'

export default function CategorieV2(props) {

    const [categorieBool, setCategorieBool] = useState([true, false, false])
    const [categorieDisplay, setCategorieDisplay] = useState(["Crypto", "Stocks", "Politics"])
    const [descriptionDisplay, setDescriptionDisplay] = useState([
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem",
        "Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos",
        "blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur "
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
        <Box sx={{ position: 'fixed', width: "22%", left: 0, top: "90px", bottom: 0 }} className="categorie_container">
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
                <Box className='categorie_list'>
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
            </Box>
        </Box>
    );
}