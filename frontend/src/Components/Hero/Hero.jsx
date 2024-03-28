import React from 'react';
import './Hero.css';
import arrow_icon from '../Assets/arrow.png';

export const Hero = () => {
    return (
        <div className='hero'>
            <div className='hero-left'>
                <div className='tagline'>
                    <p>Green Is Future</p>
                    <p>Shop it now</p>
                </div>
                <div className='hero-latest-btn'>
                    <div>Fresh Release</div>
                    <img src={arrow_icon} alt='' />
                </div>
            </div>
        </div>
    );
};

export default Hero;