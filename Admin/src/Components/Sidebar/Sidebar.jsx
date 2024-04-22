import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import add_product_icon from '../../assets/addproducts.png'
import list_product_items from '../../assets/list-products.png'
const Sidebar = () => {
    return (
        <div className='sidebar'>
            <Link to='/addproduct' style={{ textDecoration: 'none' }}>
                <div className="sidebar-item">
                    <img src={add_product_icon} alt="" />
                    <p>Add Product</p>
                </div>
            </Link>
            <Link to='/listproduct' style={{ textDecoration: 'none' }}>
                <div className="sidebar-item">
                    <img src={list_product_items} alt="" />
                    <p>Product List</p>
                </div>
            </Link>
        </div >
    );
}

export default Sidebar;
