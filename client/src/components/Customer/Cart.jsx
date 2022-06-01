import React from 'react'
import CheckoutProduct from './CheckoutProduct'
import "./cart.scss"
import Subtotal from '../../elements/Subtotal/Subtotal'
import Navbar from "../../elements/common/Navbar/Navbar";
import { getfooditembyid } from '../../API calls/FoodItems';

import { useEffect, useState, useRef } from "react";

function Cart() {
  var user = localStorage.getItem("token");
  const Users = () => {
  }

  const [products, setProducts] = useState([]);

  useEffect(async () => {
    const getFoodDetails = async () => {
      var cart = JSON.parse(localStorage.getItem("cart"));
      var ids = [];// id1, id2, id3
      var title = [];// title1, title2, title3
      var pics = [];// pic1, pic2, pic3
      var prices = [];// price1, price2, price3
      var qtys = [];// qty1, qty2, qty3

      for (var i = 0; i < cart.length; i++) {
        // check if the item is already in the cart
        if (ids.findIndex(id => id === cart[i].id) !== -1) {
          console.log("already in cart", cart[i].id)
          // if it is, increment the qty
          var index = ids.indexOf(cart[i].id)
          qtys[index] = qtys[index] + 1;
          continue;
        }
        else {
          // api call to get the product details
          await getfooditembyid(cart[i].id).then(data => {
            // console.log(data)
            ids.push(cart[i].id);
            title.push(data.data.fooditem.Item_Name);
            pics.push(data.data.fooditem.Item_picture);
            prices.push(data.data.fooditem.Item_price);
            qtys.push(1);
          });
        }
      }
      console.log([ids, title, pics, prices, qtys]);
      for(var i=0;i<ids.length;i++){
        setProducts(prevProducts => {
          return [...prevProducts, {
            id: ids[i],
            title: title[i],
            image: pics[i],
            price: prices[i],
            qty: qtys[i]
          }]
        })
      }
      console.log(title)
    }
    getFoodDetails();
  },[]);
  return (
    <div className='Cart'>
      <div className='Header'>
        <Navbar />
      </div>
      <div className="checkout">
        <div className="checkout__left">
          <img
            className="checkout__ad"
            src="https://s3-ap-southeast-1.amazonaws.com/getz-prod/5a2d7c95-2b84-4abf-a068-af8e7c21b2b0/-740801889_-264324650_201904OnlineBanner-GRestaurant(5).png"
            alt=""
          />

          <div>
            <h3>Hello, {user ? Users() : "Guest"}</h3>
            <h2 className="checkout__title">Your shopping Basket</h2>
            {
              products.map(item => (
                <CheckoutProduct
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  qty={item.qty}
                />
              ))
            }

          </div>
        </div>

        <div className="checkout__right">
          <Subtotal />
        </div>
      </div>
    </div>
  )
}

export default Cart