import React, { useRef, useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';

export const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const { getTotalCartItems } = useContext(ShopContext);
    const menuRef = useRef();

    return (
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt='' />
                <p>EverEarth</p>
            </div>
            <ul ref={menuRef} className='nav-menu'>
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
                <li onClick={() => setMenu("niche")}>
                    <Link style={{ textDecoration: 'none' }} to="/niche">Niche</Link>
                    {menu === "niche" && <hr />}
                </li>
                <li onClick={() => setMenu("furniture")}>
                    <Link style={{ textDecoration: 'none' }} to="/furniture">Furniture</Link>
                    {menu === "furniture" && <hr />}
                </li>
            </ul>
            <div className='nav-login-cart'>
                {localStorage.getItem('auth-token') ? (
                    <button onClick={() => {
                        localStorage.removeItem('auth-token');
                        window.location.replace("/");
                    }}>Logout</button>
                ) : (
                    <Link to='/login'><button>Login</button></Link>
                )}
                <Link to='/cart'><img src={cart_icon} alt="" /></Link>
                <div className='nav-cart-count'>{getTotalCartItems()}</div>
            </div>
        </div>
    );
};

export default Navbar;
