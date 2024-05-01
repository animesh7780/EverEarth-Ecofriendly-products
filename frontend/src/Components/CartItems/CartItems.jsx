import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

const CartItems = () => {
    const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);

    return (
        <div className='cartitems'>
            <div className='cartitems-fomat-main'>
                <p className='cartitems-header'>Products</p>
                <p className='cartitems-header'>Title</p>
                <p className='cartitems-header'>Price</p>
                <p className='cartitems-header'>Quantity</p>
                <p className='cartitems-header'>Total</p>
                <p className='cartitems-header'>Remove</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return (
                        <div key={e.id}>
                            <div className='cartitems-format'>
                                <img src={e.image} alt={e.name} className='carticon-product-icon' /> {/* Added alt attribute */}
                                <p>{e.name}</p>
                                <p>${e.new_price}</p>
                                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                                <p>${e.new_price * cartItems[e.id]}</p>
                                <img src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt='Remove' /> {/* Added alt attribute */}
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null;
            })}
            <div className='cartitems-down'>
                <div className='cartitems-total'>
                    <h1>cart Totals</h1>
                    <div>
                        <div className='cartitems-total-item'>
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className='cartitems-total-item'>
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className='cartitems-total-items'>
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button >ORDER NOW</button>
                </div>
                <div className='cartitems-promocode'>
                    <p>If you have a promo code, enter it here:</p>
                    <input type="text" className="promocode-input" placeholder="Enter promo code" />
                    <button className="apply-button">Apply</button>
                </div>
            </div>
        </div>
    );
}

export default CartItems;