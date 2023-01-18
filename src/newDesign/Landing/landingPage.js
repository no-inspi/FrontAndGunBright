import {useEffect} from 'react'

import '../../css/landingPage/landingpage.css';
import { Link } from "react-router-dom";

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import SmartButtonIcon from '@mui/icons-material/SmartButton';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';

export default function LandingPage(props) {

    useEffect(() => {
        const el = document.querySelector(".loader-container");
        if (el) {
            el.remove();
        }
    })

    return (
        <div>
            <div className='header_container'>
                <div className='title_container'>
                    <div className='title_title'>
                        Braight
                    </div>   
                    <div className='title_description'>
                        Le réseau social de l'influence anonyme
                    </div>   
                </div>  
                <div>
                    <Link to="/" >
                        <button className='gotoapp'>Enter Braight</button>
                    </Link>
                    {/* <button >Enter Braight</button> */}
                </div>        
            </div>
            <div className='header1_container'>
                <div className='borderBottomWhite'>
                    <div className='header1_bigtext'>
                        Un nouveau souffle pour les réseaux sociaux
                    </div>
                    <div className='header1_text'>
                        Dans le monde actuel,  les réseaux sociaux envoient à leur utilisateurs du contenu en fonction de l'impact des gens qui l'ont créer. Lipsum dolor sit amet, Sed urna libero, commodo in ligula sed, accumsan posuere mauris. 
                    </div>
                    <div className='header1_text'>
                        De ce postulat là, Ii est rapidement devenu important pour nous de créer une alternative à ce système, permettant enfin aux utilisateurs de recevoir du contenu intéressant, non censuré et adapté à leur besoin.
                    </div>
                    <div className='header1_text'> 
                        Braight tente donc de s’insérer comme un vent de fraîcheur dans un monde où l’intérêt  pour un contenu est dirigé par la personne le proposant, et où la collecte d’informations personnelles devient un sujet de plus en plus important. 
                    </div>
                </div>
            </div>
            <div className='header2_container'>
                <div className='header2_title_effect'>
                    C'est pourquoi nous faisons aujourd'hui naître Braight
                </div>
            </div>
            <div className="header3_container">
                <div className="header3_card">
                    <div className='icon_card'>
                        <FiberManualRecordIcon sx={{ fontSize: 40 }}/>
                    </div>
                    <div className='header3_title'>
                        Anonymes
                    </div>
                    <div>
                        Vivamus non lacus et tellus posuere fermentum.
                    </div>
                </div>
                <div className="header3_card">
                    <div className='icon_card'>
                        <SmartButtonIcon sx={{ fontSize: 40 }}/>
                    </div>
                    <div className='header3_title'>
                        intéressant
                    </div>
                    <div>
                        Vivamus non lacus et tellus posuere fermentum.
                    </div>
                </div>
                <div className="header3_card">
                    <div className='icon_card'>
                        <DataUsageIcon sx={{ fontSize: 40 }}/>
                    </div>
                    <div className='header3_title'>
                        Transparence des données
                    </div>
                    <div>
                        Vivamus non lacus et tellus posuere fermentum.
                    </div>
                </div>
                <div className="header3_card">
                    <div className='icon_card'>
                        <StackedLineChartIcon sx={{ fontSize: 40 }}/>
                    </div>
                    <div className='header3_title'>
                        évolutions rapides
                    </div>
                    <div>
                        Vivamus non lacus et tellus posuere fermentum.
                    </div>
                </div>
            </div>
            <div className='button_joinus_container'>
                <button className='button_joinus'>Rejoins-nous</button>
            </div>
            <footer className='footer'>
                <div className='footer_text'>
                    Contact
                </div>
                <div className='footer_text'>
                    Braight © 2022
                </div>
                <div className='footer_text'>
                    Infos légales
                </div>
            </footer>
        </div>
    )
}