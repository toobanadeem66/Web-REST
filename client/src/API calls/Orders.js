import Api from './Api';

// var token = JSON.parse(localStorage.getItem("token"))
// const header = { headers: { Authorization: `Bearer ${token}` } }; 

export async function getOrders() {
  var response = await Api.get("http://localhost:3000/orders/getOrders")
    .catch(err => {
      console.log(err);
    });

  return response
}
// todo soft delete
export async function deleteOrder(id) {
  var response = await Api.delete(`http://localhost:3000/orders/${id}`)
    .catch(err => {
      console.log(err);
    });

  return response
}

export async function updateOrder(orderId, paymentstatus, status) {
  var response = await Api.put(`http://localhost:3000/orders/${orderId}`,
    {
      isPaid:paymentstatus,
      Order_Status:status 
   }
  )
    .catch(err => {
      console.log(err);
    });

  return response
}

