import React, { useContext } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';

export const ShopCategory = (props) => { 
    const { all_product, loading, error } = useContext(ShopContext);

    // Ensure all_product is an array and category is lowercase
    const products = Array.isArray(all_product) ? all_product : [];
    const currentCategory = props.category.toLowerCase();

    // Filter products by category
    const categoryProducts = products.filter(item => 
        item && item.category === currentCategory
    );

    console.log('Category:', currentCategory);
    console.log('All products:', products);
    console.log('Filtered products:', categoryProducts);

    if (loading) {
        return (
            <div className='Shop-Category'>
                <img className='banner' src={props.banner} alt='' />
                <div className='loading'>Loading products...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='Shop-Category'>
                <img className='banner' src={props.banner} alt='' />
                <div className='error'>{error}</div>
            </div>
        );
    }

    if (!Array.isArray(all_product)) {
        return (
            <div className='Shop-Category'>
                <img className='banner' src={props.banner} alt='' />
                <div className='error'>Unable to load products. Please try again.</div>
            </div>
        );
    }

    return (
        <div className='Shop-Category'>
            <img className='banner' src={props.banner} alt='' />
            <div className='shopcategory-indexSort'>
                <p>
                    <span>Showing {categoryProducts.length}</span> products in {currentCategory}
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
                    <div className='no-products'>
                        <p>No products available in {currentCategory}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShopCategory;