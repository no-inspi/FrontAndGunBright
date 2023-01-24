import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import '../css/ancre.css';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


export default function Ancre(props) {
    const [BacktoTop, setBacktopTop] = useState("");
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                setBacktopTop("d-block");
            } else setBacktopTop("");
        });
    }, []);
    const screenup = () => {
        console.log("screenup")
        window.scrollTo({
            top: 10,
            behavior: "smooth",
            //   smooth
        });
    };
    return (
        <div>
            <Link
                to="#"
                id="back-to-top"
                onClick={screenup}
                className={`${BacktoTop}`}
            >
                <KeyboardArrowUpIcon />
            </Link>
        </div>
    );
};
