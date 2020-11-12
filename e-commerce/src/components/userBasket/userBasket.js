import React from 'react'
import Subtotal from '../Subtotal/Subtotal'
import { useStateValue } from './../cotexApi/StateProvider';
import CheckoutProduct from './../CheckoutProduct/CheckoutProduct';
import './userBasket.css'

function UserBasket() {


     const [{ basket, user }, dispatch] = useStateValue();


    return (
        <div>
            <div className="checkout">

            <div className="checkout_left">
              

                <div className="checkout_title">

                    <h4>Hello,  {user?.email}  </h4>

                    {basket.map(item => (
                        <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                        />
                    ))}
                </div>
            </div>


       

        </div>   

<Subtotal/>


        </div>
    )
}

export default UserBasket
