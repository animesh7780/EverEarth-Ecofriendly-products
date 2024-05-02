import React from 'react';
import './Footer.css';
import footer_logo from '../Assets/logo.png';
import instagram_icon from '../Assets/instagram_icon.png';
import pintrest_icon from '../Assets/pintester_icon.png';
import whatsapp_icon from '../Assets/whatsapp_icon.png';

export const Footer = () => {
    return (
        <div className='footer'>
            <div className='footer-logo'>
                <img src={footer_logo} alt='' />
                <p>EverEarth</p>
            </div>
            <ul className='footer-links'>
                <li>Company</li>
                <li>Products</li>
                <li>Offices</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <div className='footer-social-icon'>
                <div className='footer-icons-container'>
                    <a href='https://www.instagram.com/' target='_blank' rel='noopener noreferrer'>
                        <img src={instagram_icon} alt='Instagram' />
                    </a>
                </div>
                <div className='footer-icons-container'>
                    <a href='https://in.pinterest.com/' target='_blank' rel='noopener noreferrer'>
                        <img src={pintrest_icon} alt='' />
                    </a>
                </div>
                <div className='footer-icons-container'>
                    <a href='https://www.instagram.com/' target='_blank' rel='noopener noreferrer'>
                        <img src={whatsapp_icon} alt='' />
                    </a>
                </div>
            </div>
            <div className='footer-copyright'>
                <hr />
                <p>&#169; 2024 - All Rights Reserved.</p>
                <p>MAKE IN INDIA</p>
            </div>
        </div>
    );
};

export default Footer;