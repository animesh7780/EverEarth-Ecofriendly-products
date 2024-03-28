import React from 'react'
import furniturepros from '../Components/Assets/furnitureproducts'
import './CSS/Toiletries.css'
import Item from '../Components/Item/Item'
import banner_furniture from '../Components/Assets/banner_furniture.png'

export const Furniture = () => {
    return (
        <div className='banner'>
            <img src={banner_furniture} alt="" />
            <div className='newcollections'>
                <hr />
                <div className='collections'>
                    {furniturepros.map((item, i) => {
                        return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                    })}

                </div>


            </div>
        </div>
    )
}
export default Furniture;