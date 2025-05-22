import React, { useEffect, useState } from 'react'
import './NewCollections.css'
//import new_collection from '../Assets/new_collections'
import Item from '../Item/Item'

export const NewCollections = () => {

    const [new_collection, setNew_collection] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        setLoading(true);
        fetch('https://everearth-backend.onrender.com/newcollections')
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('New collections data:', data);
                setNew_collection(data);
                setError(null);
            })
            .catch((error) => {
                console.error('Error fetching new collections:', error);
                setError(error.message);
                setNew_collection([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [])
    return (
        <div className='newcollections'>
            <h1>NEW ARRIVALS</h1>
            <hr />
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error}</div>
            ) : new_collection.length === 0 ? (
                <div>No new collections available</div>
            ) : (
                <div className="collections">
                    {new_collection.map((item, i) => (
                        <Item 
                            key={i} 
                            id={item.id} 
                            name={item.name} 
                            image={item.image} 
                            new_price={item.new_price} 
                            old_price={item.old_price} 
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
export default NewCollections;