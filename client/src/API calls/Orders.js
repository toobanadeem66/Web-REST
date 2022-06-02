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

export async function addOrder(total) {
  var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    var user_id = JSON.parse(localStorage.getItem("User_ID"))

    

  var response = await Api.post("http://localhost:3000/orders",{
    R_ID : 2,
    Order_Status: "out for delivery",
    User_ID: user_id ,
    Creation_time: dateTime,
    Delivered_time: null ,
    Total_Price: total,
    isPaid: true,
    Tax: 0.1
  })
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

export async function updateOrder(orderId, paymentstatus, status, delivered) {
  var response = await Api.put(`http://localhost:3000/orders/${orderId}`,
    {
      isPaid:paymentstatus,
      Order_Status:status,
      Delivered_time:delivered
   }
  ) 
    .catch(err => {
      console.log(err);
    });

  return response
}

// export async function saveOrder(totalprice) {
// //   var today = new Date();
// //   var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  
// //   var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
// //   var dateTime = date+' '+time;

// // console.log(dateTime)
// // console.log(totalprice)

// //  var user_id = localStorage.getItem("User_ID")
//  console.log("in")
//   var response = await Api.post("http://localhost:3000/orders", {
//     R_ID : 2,
//     Order_Status: "out for delivered",
//     User_ID: "629282f9d5635e8ea9020143" ,
//     Creation_time: "1:53 pm 26th May 2022",
//     Delivered_time: "2:00pm 29th May 2022" ,
//     Total_Price: 450,
//     isPaid: true,
//     Tax: 0.1
//   })
//   .catch(err => {
//     console.log(err);
//   });

// return response

// }
