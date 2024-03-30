import React from 'react'
import EveryDaypros from '../Components/Assets/Everdayproducts'
import './CSS/EveryDay.css'
import Item from '../Components/Item/Item'
import banner_EveryDay from '../Components/Assets/banner_everyday.png'

export const EveryDay = () => {
    return (
        <div className='banner'>
            <img src={banner_EveryDay} alt="" />
            <div className='newcollections'>
                <hr />
                <div className='collections'>
                    {EveryDaypros.map((item, i) => {
                        return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                    })}

                </div>


            </div>
        </div>
    )
}
export default EveryDay;