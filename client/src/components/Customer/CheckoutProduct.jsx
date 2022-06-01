import React from 'react'
import { useStateValue } from "../../redux/StateProvider";




const CheckoutProduct = ({ id, image, title, price, rating, hideButton }) => {

    const [{ basket }, dispatch] = useStateValue();
    const removeFromBasket = () => {
        // remove the item from the basket
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        })
    }
    


    var image = ""
    var title = ""
    var price = ""

  return (
    <div className='checkoutProduct'>
    <img className='checkoutProduct__image' src={image} />

    <div className='checkoutProduct__info'>
        <p className='checkoutProduct__title'>{title}</p>
        <p className="checkoutProduct__price">
            <small>Rs</small>
            <strong>{price}</strong>
        </p>


        {!hideButton && (
            <button onClick={removeFromBasket}>Remove from Basket</button>
        )}
    </div>
</div>
  )
}

export default CheckoutProduct