import React from 'react'
import GreenDevicepros from '../Components/Assets/greendevicesproducts'
import './CSS/GreenDevices.css'
import Item from '../Components/Item/Item'
import banner_greendevices from '../Components/Assets/banner_greendevices.png'

export const GreenDevices = () => {
    return (
        <div className='banner'>
            <img src={banner_greendevices} alt="" />
            <div className='newcollections'>
                <hr />
                <div className='collections'>
                    {GreenDevicepros.map((item, i) => {
                        return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                    })}

                </div>


            </div>
        </div>
    )
}
export default GreenDevices;