import React from 'react'
import "./checkoutproduct.scss"
import { useStateValue } from "../../redux/StateProvider";
const CheckoutProduct = ({ id, title, image, price, qty}) => {
    const removeFromCart = id => {
        console.log("Removed from cart", id)
        // get local storage cart
        var cart = JSON.parse(localStorage.getItem("cart"));
        console.log(cart)
        var newCart = cart.filter(item => item.id !== id);
        // set local storage cart
        localStorage.setItem("cart", JSON.stringify(newCart));
        window.location.reload();
    }
    return (
        <div className='checkoutProduct'>
            {/* image */}
            <img className='checkoutProduct__image' src={image} />
            {/* info */}
            <div className='checkoutProduct__info'>
                {/* title */}
                <p className='checkoutProduct__title'>{title}</p>
                {/* price */}
                <p className="checkoutProduct__price">
                    <small>Rs</small>
                    <strong>{price}</strong>
                </p>
                {/* qty */}
                <p className="checkoutProduct__price">
                    <small>Qty</small>
                    <strong>{qty}</strong>
                </p>
                {
                    <button onClick={() => removeFromCart(id)}>Remove from Basket</button>
                }
            </div>
        </div>
    )
}

export default CheckoutProduct