import React from 'react';
import './CSS/ThankYou.css'; // Remember to create ThankYouPage.css for styling
import { Link } from 'react-router-dom';
import thankyouimg from '../Components/Assets/thank.png'
const ThankYou = () => {
    return (
        <div className="thank-you-container">
            <h1>Thank You for Your Order!</h1>
            <p>Your order has been successfully placed.</p>
            <p>We appreciate your business.</p>
            <p>Feel free to contact us if you have any questions or concerns.</p>
            <img src={thankyouimg} alt="" />
            <Link to='/'><button>Back to Home</button></Link>
        </div>
    );
};

export default ThankYou;
