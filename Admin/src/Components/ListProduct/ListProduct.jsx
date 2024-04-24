import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import crossIcon from '../../assets/cart_cross_icon.png';

const ListProduct = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [error, setError] = useState(null);

    const fetchInfo = async () => {
        try {
            const response = await fetch('http://localhost:4000/allproducts');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setAllProducts(data);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    const removeProduct = async (id) => {
        try {
            const response = await fetch('http://localhost:4000/removeproduct', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
            if (!response.ok) {
                throw new Error('Failed to remove product');
            }
            await fetchInfo();
        } catch (error) {
            setError(error.message);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='listproduct'>
            <h1>All Product List</h1>
            <div className="listproducts-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>
            <div className="listproducts-allproducts">
                <hr />
                {allProducts.map((product) => (
                    <div key={product.id} className='listproducts-format-main listproduct-format'>
                        <img src={product.image} alt="" className="listproduct-product-icon" />
                        <p>{product.name}</p>
                        <p>${product.old_price}</p>
                        <p>${product.new_price}</p>
                        <p>{product.category}</p>
                        <img onClick={() => removeProduct(product.id)} src={crossIcon} alt="" className="listproduct-remove-icon" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListProduct;
