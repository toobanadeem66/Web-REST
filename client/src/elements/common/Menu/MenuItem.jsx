import React from 'react'
import "./menuitem.scss"


const addToCart = (props) => {

  const cart = () => {
  console.log("item added to cart")
  console.log(props)
  //get the cart from local storage
  var cart = JSON.parse(localStorage.getItem("cart"))
  //if cart is empty, create a new array
  if(cart === null) { 
    cart = []
  }
  //add the item to the cart
  cart.push({
    id: props.data._id,
  })
  //save the cart back to local storage
  localStorage.setItem("cart", JSON.stringify(cart))
}

cart()
}

 const MenuItem = (props) => {
 console.log(props)
  return (
    <div className='a-box'>

      <div className="a-b-img">

        <img src = {props.image} alt = "french toast" />
        
      </div>

      <div className="a-b-text">
      <h2> {props.title} </h2>
      <p className='product_desc'> {props.desc} </p>
      <p className = "product_price"> {props.price} </p>
      <button className='productbox-button' onClick={() => addToCart(props)}> Order Now </button>
      </div>

    </div>
  )
}

export default MenuItem
