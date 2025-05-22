import React, { useEffect, useState } from 'react'
import './NewCollections.css'
//import new_collection from '../Assets/new_collections'
import Item from '../Item/Item'

export const NewCollections = () => {

    const [new_collection, setNew_collection] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchNewCollections = async () => {
            try {
                setLoading(true);
                console.log('Fetching new collections...');
                const response = await fetch('https://everearth-backend.onrender.com/newcollections');
                console.log('Response status:', response.status);
                console.log('Response headers:', response.headers);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('New collections raw data:', data);
                
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

                console.log('Data validation passed, setting new collections...');
                setNew_collection(data);
                setError(null);
            } catch (error) {
                console.error('Error in fetchNewCollections:', error);
                setError(error.message);
                setNew_collection([]);
            } finally {
                setLoading(false);
            }
        };

        fetchNewCollections();
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