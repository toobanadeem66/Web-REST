import axios from 'axios';


var token = JSON.parse(localStorage.getItem("token"))
const header = { headers: { Authorization: `Bearer ${token}` } }; 

export  async function getOrders() {
  var response = await axios.get("http://localhost:3000/orders/getOrders", header)
      .catch(err => {
        console.log(err);
      });

      return response
  }