import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Popular.css';
//import data_product from '../Assets/data';
import Item from '../Item/Item';

const Popular = () => {

    const [popular_product, setPopular_product] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/popular')
            .then((response) => response.json())
            .then((data) => setPopular_product(data));
    }, [])

    return (
        <div className='popular'>
            <h1>POPULAR</h1>
            <hr />
            <div className='popular-item'>
                {popular_product.map((item, i) => (
                    // Ensure each item has a unique key
                    <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                ))}
            </div>
        </div>
    );
};

// PropTypes for props validation
Popular.propTypes = {
    data_product: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            new_price: PropTypes.number.isRequired,
            old_price: PropTypes.number.isRequired,
        })
    ),
};

export default Popular;