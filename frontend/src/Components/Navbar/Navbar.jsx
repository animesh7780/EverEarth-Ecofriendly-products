import React, { useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    const [menu, setMenu] = useState("shop");

    return (
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt='' />
                <p>EverEarth</p>
            </div>
            <ul className='nav-menu'>
                <li onClick={() => setMenu("shop")}>
                    <Link style={{ textDecoration: 'none' }} to="/">Shop</Link>
                    {menu === "shop" && <hr />}
                </li>
                <li onClick={() => setMenu("everyday")}>
                    <Link style={{ textDecoration: 'none' }} to='/everyday'>EveryDay</Link>
                    {menu === "everyday" && <hr />}
                </li>
                <li onClick={() => setMenu("toiletries")}>
                    <Link style={{ textDecoration: 'none' }} to="/toiletries">Toiletries</Link>
                    {menu === "toiletries" && <hr />}
                </li>
                <li onClick={() => setMenu("greendevices")}>
                    <Link style={{ textDecoration: 'none' }} to="/greendevices">Green Devices</Link>
                    {menu === "greendevices" && <hr />}
                </li>
                <li onClick={() => setMenu("trulyhead")}>
                    <Link style={{ textDecoration: 'none' }} to="/trulyhead">Truly Head</Link>
                    {menu === "trulyhead" && <hr />}
                </li>
                <li onClick={() => setMenu("furniture")}>
                    <Link style={{ textDecoration: 'none' }} to="/furniture">Furniture</Link>
                    {menu === "furniture" && <hr />}
                </li>
            </ul>
            <div className='nav-login-cart'>
                <Link to='/login'><button>Login</button></Link>
                <Link to='/cart'><img src={cart_icon} alt="" /></Link>
                <div className='nav-cart-count'>0</div>
            </div>
        </div>
    );
};

export default Navbar;