import React from "react";
import Subtotal from "../Subtotal/Subtotal";
import { useStateValue } from "./../cotexApi/StateProvider";
import CheckoutProduct from "./../CheckoutProduct/CheckoutProduct";
import "./userBasket.css";

function UserBasket() {
  const [{ basket, user }, dispatch] = useStateValue();

  //  const g =  basket.reduce((amount, item) => parseFloat(item.price) + amount, 0)

  //     console.log('g',g)
  return (
    <div className="checkout">
      <div className="checkout_left">
        <div className="checkout_title">
          <h4>Hello, {user?.email} </h4>

          <Subtotal />
          <div className="userbasket">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserBasket;
