import React from 'react'
import nichepros from '../Components/Assets/nicheproducts'
import './CSS/Toiletries.css'
import Item from '../Components/Item/Item'
import banner_niche from '../Components/Assets/banner_niche.png'

export const Niche = () => {
    return (
        <div className='banner'>
            <img src={banner_niche} alt="" />
            <div className='newcollections'>
                <hr />
                <div className='collections'>
                    {nichepros.map((item, i) => {
                        return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                    })}

                </div>


            </div>
        </div>
    )
}
export default Niche;