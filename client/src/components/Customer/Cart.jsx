import React from 'react'
import CheckoutProduct from './CheckoutProduct'
import "./cart.scss"
import Subtotal from '../../elements/Subtotal/Subtotal'
import { useStateValue } from "../../redux/StateProvider";
import Navbar from "../../elements/common/Navbar/Navbar";
import Api from "../../API calls/Api";





const Cart = () => {
    // const [{ basket, user }, dispatch] = useStateValue();
            var user = localStorage.getItem("token");
    const Users = () => {

    }



  return (
    <div className='Cart'>
      <div className='Header'>
           <Navbar/>
      </div>

    <div className="checkout">
      

    <div className="checkout__left">
      <img
        className="checkout__ad"
        src="https://s3-ap-southeast-1.amazonaws.com/getz-prod/5a2d7c95-2b84-4abf-a068-af8e7c21b2b0/-740801889_-264324650_201904OnlineBanner-GRestaurant(5).png"
        alt=""
      />
       <div>
        <h3>Hello, {"Guest"}</h3>
        </div>

        <h2 className="checkout__title">Your shopping Basket</h2>
{/* 
      <div>
        <h3>Hello, {user? Users() : "Guest"}</h3>
        <h2 className="checkout__title">Your shopping Basket</h2>

        {basket.map(item => (
          <CheckoutProduct
            id={item.id}
            title={item.title}
            image={item.image}
            price={item.price}
            rating={item.rating}
          />
        ))}

      </div> */}
    </div>

    <div className="checkout__right">
      <Subtotal />
    </div>
  </div>
    </div>
  )
}

export default Cart