import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/uploadarea.png';

const AddProduct = () => {
    const [image, setImage] = useState(null);
    const [productDetails, setProductDetails] = useState({
        name: '',
        image: '',
        category: 'EveryDay',
        new_price: '',
        old_price: ''
    });

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const Add_Product = async () => {
        console.log(productDetails);

        const formData = new FormData();
        formData.append('product', image);

        try {
            const response = await fetch('https://everearth-backend.onrender.com/upload', {
                method: 'POST',
                body: formData
            });

            const responseData = await response.json();

            if (responseData.success) {
                const updatedProduct = { ...productDetails, image: responseData.image_url };
                console.log(updatedProduct);

                const addProductResponse = await fetch('https://everearth-backend.onrender.com/addproduct', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedProduct)
                });

                const addProductData = await addProductResponse.json();

                if (addProductData.success) {
                    alert('Product added successfully');
                } else {
                    alert('Failed to add product');
                }
            }
        } catch (error) {
            console.error('Error occurred:', error);
            alert('An error occurred while adding product');
        }
    };

    return (
        <div className='addproduct'>
            <div className="addproduct-itemfield">
                <p>Product Title</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type here' />
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type here' />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector' id="">
                    <option value="EveryDay">EveryDay</option>
                    <option value="Toiletries">Toiletries</option>
                    <option value="Greendevices">Greendevices</option>
                    <option value="Niche">Niche</option>
                    <option value="Furniture">Furniture</option>
                </select>
            </div>
            <div className="adproduct-itemfeild">
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumbnail-img' alt="" />
                </label>
                <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
            </div>
            <button onClick={Add_Product} className='addproduct-button'>ADD</button>
        </div>
    );
};

export default AddProduct;
