import React from 'react';
import './Hero.css';
import arrow_icon from '../Assets/arrow.png';
import hero_image from '../Assets/hero_image.png';

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
            <div className='hero-right'>
                <img src={hero_image} alt='' />
            </div>
        </div>
    );
};

export default Hero;