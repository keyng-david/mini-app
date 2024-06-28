import './styles.css'
import React from 'react';
// import { TiSocialFacebook, TiSocialTwitterCircular, FaInstagram } from 'react-icons/ti';
import telegramIcon from '../../assets/images/telegramIcon.png'
import xIcon from '../../assets/images/xIcon.png'
import yutubeIcon from '../../assets/images/youtubeIcon.png'

const Splash = () =>{
    return <div className="splash">
            <div className='splash-logo'></div>
            <div className="loading-page">
                <div className="loading-animation"></div>
                <div className="social-icons">
                    <img src={telegramIcon}/>
                    <img src={xIcon}/>
                    <img src={yutubeIcon}/>
                </div>
            </div>
        </div>
}


export default Splash;