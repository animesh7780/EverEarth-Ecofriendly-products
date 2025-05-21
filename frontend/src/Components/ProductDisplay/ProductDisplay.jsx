import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'
import { Link } from 'react-router-dom'

export const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);
    const isLoggedIn = !!localStorage.getItem('auth-token');
    return (
        <div className='productdisplay'>
            <div className='productdisplay-left'>
                <div className='productdisplay-img-list'>
                    <img src={product.image} alt='' />
                    <img src={product.image} alt='' />
                    <img src={product.image} alt='' />
                    <img src={product.image} alt='' />
                </div>
                <div className='productdisplay-img'>
                    <img className='productdisplay-main-img' src={product.image} alt='' />
                </div>

            </div>
            <div className='productdisplay-right'>
                <h1>{product.name}</h1>
                <div className='productdisplay-right-star'>
                    <img src={star_icon} alt='' />
                    <img src={star_icon} alt='' />
                    <img src={star_icon} alt='' />
                    <img src={star_icon} alt='' />
                    <img src={star_dull_icon} alt='' />
                    <p>(122)</p>
                </div>
                <div className='productdisplay-right-prices'>
                    <div className='productdisplay-right-old'>${product.old_price}</div>
                    <div className='productdisplay-right-new'>${product.new_price}</div>
                </div>
                <div className='productdisplay-right-description'>

                    Shirts, versatile and timeless, are wardrobe staples suitable for various occasions. From formal gatherings to casual outings, they offer unparalleled comfort and style. With their diverse range of fabrics, patterns, and designs, shirts cater to every individual's taste and preference

                </div>
                <div className='productdisplay-right-size'>
                    {/* <h1>Select Size</h1> */}
                    {/* <div className='productdisplay-right-size'>
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div> */}
                    {isLoggedIn ? (
                    <button onClick={() => { addToCart(product.id) }}>ADD TO CART</button>
                ) : (
                    <Link to="/login" className="login-to-cart">
                        <button>LOGIN TO ADD TO CART</button>
                    </Link>
                )}
                    <p className='productdisplay-right-category'><span>Category:</span>Bamboo, Green</p>
                    <p className='productdisplay-right-category'><span>Tags:</span>Modern,Latest</p>
                </div>

            </div>

        </div>
    )
}
export default ProductDisplay