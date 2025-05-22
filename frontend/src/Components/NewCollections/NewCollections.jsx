import React, { useEffect, useState } from 'react'
import './NewCollections.css'
//import new_collection from '../Assets/new_collections'
import Item from '../Item/Item'

export const NewCollections = () => {

    const [new_collection, setNew_collection] = useState([]);
    useEffect(() => {
        fetch('https://everearth-backend.onrender.com/newcollections')
            .then((response) => response.json())
            .then((data) => setNew_collection(data))
            .catch((error) => {
                console.error('Error fetching new collections:', error);
                setNew_collection([]);
            });
    }, [])
    return (
        <div className='newcollections'>
            <h1>UPDATED LINES</h1>
            <hr />
            <div className='collections'>
                {new_collection.map((item, i) => {
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                })}

            </div>


        </div>
    )
}
export default NewCollections;