import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const Product = () => {
    const { all_product } = useContext(ShopContext);
    const { productId } = useParams();
    
    // Check if all_product is loaded and valid
    if (!Array.isArray(all_product)) {
        return <div className="loading">Loading...</div>;
    }
    
    const product = all_product.find((e) => e.id === Number(productId));
    
    // Check if product exists
    if (!product) {
        return <div className="error">Product not found</div>;
    }

    return (
        <div>
            <Breadcrum product={product} />
            <ProductDisplay product={product} />
            <DescriptionBox />
            <RelatedProducts />
        </div>
    )
}

export default Product