import React from 'react'
import './CheckoutProduct.css'
import { useStateValue } from './../cotexApi/StateProvider';

function CheckoutProduct({ id, image, title, price, rating }) {

const [{ basket }, dispatch] = useStateValue();

    const removeFormBasket=()=>{
dispatch({
    type:'REMOVE_FROM_BASKET',
    id:id,
})
}
    return (
        <div className="checkoutProduct">
            <img src={image} alt="" className="checkoutProduct_image" />
            <div className="checkoutProduc_info">
                <p className="checkoutProduct_title">{title}</p>
                <p className="checkoutProduct_price">
                    <small>$</small><strong>{price}</strong>
                </p>
           
                <button onClick={removeFormBasket}>Removed From Busket</button>
            </div>
        </div>
    )
}

export default CheckoutProduct

