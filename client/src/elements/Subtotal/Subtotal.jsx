import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../../redux/StateProvider";
import { getBasketTotal } from "../../redux/Reducer";
import { useNavigate } from "react-router-dom";
import { getfooditembyid } from "../../API calls/FoodItems"
import { useEffect } from "react";





function Subtotal() {
  const history = useNavigate();

  var cart = JSON.parse(localStorage.getItem("cart"));
  var subTotal = 0;
  var [total, setTotal] = React.useState([]);
  var prior=[];

  useEffect(() => {
    const totalPrice = () => {
      for (var i = 0; i < cart.length; i++) {
        // iterate ids from cart
        var id = cart[i].id;
        // get the product from the id by api call
        getfooditembyid(id).then(data => {          
          prior.push(data.data.fooditem.Item_price)
        })        

      }
      console.log(prior)
      setTotal(prior)   
      console.log(total)   
      
    }
    totalPrice();
  }, [])

  useEffect(() => {
    const totalPrice1 = () => {
      for(var i in total){
        console.log(total[i].price)  
        subTotal=subTotal+(total[i].price)
        console.log(subTotal)
      }
      console.log(subTotal)
      //setTotal(prior)
    }

    totalPrice1()
  },[total])

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              {/* Part of the homework */}
              Subtotal ({cart.length} items): <strong>{subTotal}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        // value={getBasketTotal(basket)} // Part of the homework
        displayType={"text"}
        thousandSeparator={true}
        prefix={"Rs "}
      />

      <button onClick={e => history.push('/payment')}>Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;
