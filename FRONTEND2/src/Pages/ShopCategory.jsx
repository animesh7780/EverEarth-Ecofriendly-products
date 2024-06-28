import React, { useContext } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';

export const ShopCategory = (props) => { // Receive props here
  const { all_products } = useContext(ShopContext);

  return (
    <div className='Shop-Category'>
      <img src={props.banner} alt='' /> {/* Use props.banner */}
      <div className='shopcategory-indexSort'>
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className='ShopCategory-sort'>
          Sort by <img src={dropdown_icon} alt='' />
        </div>
      </div>
      <div className='ShopCategory-products'>
        {all_products && all_products.length > 0 ? (
          all_products.map((item, i) => {
            if (props.category === item.category) {
              return (
                <Item
                  key={i}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  new_price={item.new_price}
                  old_price={item.old_price}
                />
              );
            } else {
              return null;
            }
          })
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default ShopCategory;
