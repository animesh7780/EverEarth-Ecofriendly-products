import React, { useEffect, useState } from 'react'
import './RelatedProducts.css'
//import data_product from '../Assets/data'
import Item from '../Item/Item'

const RelatedProducts = () => {

    const [related_product, setrelated_product] = useState([]);

    useEffect(() => {
        fetch('https://everearth-backend.onrender.com/related')
            .then((response) => response.json())
            .then((data) => setrelated_product(data));
    }, [])
    return (
        <div className='relatedproducts'>
            <h1>Related Products</h1>
            <hr />
            <div className='relatedproducts-item'>
                {related_product.map((item, i) => {
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />

                })}

            </div>

        </div>
    )
}
export default RelatedProducts