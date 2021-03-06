import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../../redux/StateProvider";
import { getBasketTotal } from "../../redux/Reducer";
import { useNavigate } from "react-router-dom";
import { getfooditembyid } from "../../API calls/FoodItems"
import { useEffect, useState, useRef } from "react";
import { saveOrder,addOrder} from "../../API calls/Orders"





function Subtotal() {
  var subTotal = 0;
  var prior=[];
  const history = useNavigate();
  var cart = JSON.parse(localStorage.getItem("cart"));
  const [total, setTotal] = useState(0);



  async function saveOrder(){
    console.log("in")
  //  saveOrder(total).then((response)=>{
  //      console.log(response)
  //    })
       
  }

  useEffect(async () => {
    // fetch cart items
    for (var i = 0; i < cart.length; i++) {
      // iterate ids from cart
      var id = cart[i].id;
      // get the product from the id by api call
      await getfooditembyid(id).then(data => {        
        prior.push(data.data.fooditem.Item_price)
      })        
    }
    console.log("items: ", prior)
    var sum = 0;
    for (var i = 0; i < prior.length; i++) {
      sum = sum + prior[i];
    }
    console.log(sum)
    setTotal(sum);
    console.log(total)
  }, [])

  const proceed = () => {
    addOrder(total).then((response) => {
      console.log(response.data)
    })
    // show the order placed popup
  
    
  }

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              {/* Part of the homework */}
              Subtotal ({cart.length} items): <strong>{total}</strong>
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
      {/* Navigate to Menu page */}
      <button onClick={proceed}>Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;
