import React, { useState, useEffect } from 'react';
import './CSS/ShopCategory.css';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';

export const ShopCategory = (props) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            try {
                setLoading(true);
                console.log('Fetching products for category:', props.category);
                const response = await fetch(`https://everearth-backend.onrender.com/products/${props.category}`);
                console.log('Response status:', response.status);
                console.log('Response headers:', response.headers);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Category products raw data:', data);

                if (!Array.isArray(data)) {
                    console.error('Data is not an array:', data);
                    throw new Error('Invalid data format');
                }

                // Validate each item has required fields
                const validData = data.every(item => 
                    item && 
                    typeof item.id !== 'undefined' &&
                    typeof item.name === 'string' &&
                    typeof item.image === 'string' &&
                    typeof item.new_price !== 'undefined' &&
                    typeof item.old_price !== 'undefined'
                );

                if (!validData) {
                    console.error('Some items are missing required fields');
                    throw new Error('Invalid item data');
                }

                console.log('Data validation passed, setting products...');
                setProducts(data);
                setError(null);
            } catch (err) {
                console.error('Error in fetchCategoryProducts:', err);
                setError('Failed to load products');
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryProducts();
    }, [props.category]);

    if (loading) return <div className='loading'>Loading...</div>;
    if (error) return <div className='error'>{error}</div>;

    return (
        <div className='Shop-Category'>
            <img src={props.banner} alt='' /> {/* Use props.banner */}
            <div className='shopcategory-indexSort'>
                <p>
                    <span>Showing 1-12</span> out of 36 products
                </p>
                <div className='ShopCategory-sort'>
                    Sort by <img src={dropdown_icon} alt='' />
                </div>
            </div>
            <div className='ShopCategory-products'>
                {products.length > 0 ? (
                    products.map((item, i) => (
                        <Item
                            key={i}
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