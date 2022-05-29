import Api from './Api';

// var token = JSON.parse(localStorage.getItem("token"))
// const header = { headers: { Authorization: `Bearer ${token}` } }; 

export  async function getOrders() {
  var response = await Api.get("http://localhost:3000/orders/getOrders")
      .catch(err => {
        console.log(err);
      });

      return response
  }