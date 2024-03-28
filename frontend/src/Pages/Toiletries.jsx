import React from 'react'
import toiletriespros from '../Components/Assets/toiletriesproducts'
import './CSS/Toiletries.css'
import Item from '../Components/Item/Item'
import banner_toiletries from '../Components/Assets/banner_toiletries.png'

export const Toiletries = () => {
    return (
        <div className='banner'>
            <img src={banner_toiletries} alt="" />
            <div className='newcollections'>
                <hr />
                <div className='collections'>
                    {toiletriespros.map((item, i) => {
                        return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                    })}

                </div>


            </div>
        </div>
    )
}
export default Toiletries;