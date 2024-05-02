import React from 'react'
import './NewsLetter.css'

export const NewsLetter = () => {
    const showAlert = () => {
        alert('Thank You For Sunscribing to our News Letter')
    }
    return (
        <div className='newsletter'>
            <h1>Get Exclusive Offers On Your Email</h1>
            <p>Subscribe to our Newsletter and stay updated.</p>
            <div>
                <input type="email" placeholder='Your Email ID' />
                <button onClick={showAlert}>Subscribe</button>
            </div>

        </div>
    )
}
export default NewsLetter;