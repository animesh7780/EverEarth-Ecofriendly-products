import React, { useContext } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';

export const ShopCategory = (props) => { 
    const { all_product, loading, error } = useContext(ShopContext);

    // Filter products by category
    const categoryProducts = all_product.filter(item => item.category === props.category);

    if (loading) {
        return (
            <div className='Shop-Category'>
                <img src={props.banner} alt='' />
                <div className='loading'>Loading products...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='Shop-Category'>
                <img src={props.banner} alt='' />
                <div className='error'>Error loading products: {error}</div>
            </div>
        );
    }

    return (
        <div className='Shop-Category'>
            <img src={props.banner} alt='' />
            <div className='shopcategory-indexSort'>
                <p>
                    <span>Showing {categoryProducts.length}</span> products
                </p>
                <div className='ShopCategory-sort'>
                    Sort by <img src={dropdown_icon} alt='' />
                </div>
            </div>
            <div className='ShopCategory-products'>
                {categoryProducts.length > 0 ? (
                    categoryProducts.map((item) => (
                        <Item
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            image={item.image}
                            new_price={item.new_price}
                            old_price={item.old_price}
                        />
                    ))
                ) : (
                    <p>No products available in this category</p>
                )}
            </div>
        </div>
    );
};

export default ShopCategory;