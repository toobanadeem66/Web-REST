import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from "react";
import axios from "axios";
import { display } from "@mui/system";
import { getOrders } from "../../API calls/Orders";
import {getUsersById} from "../../API calls/Users";
import { SettingsInputAntennaTwoTone } from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import React from "react";




const Buttons = (params) => {
  return (
      <strong>
          <button className="DT_Btn"
              onClick={() => {
                 
              }}
          >
              < EditIcon className="DTicon"/>
          </button>

          <button className="DT_Btn"
              // onClick={() => {
                 
              // }}
          >
              <DeleteOutlineOutlinedIcon className="DTicon"/>
          </button>

      </strong>
  )
}

const columnOrders = [
  { field: '_id', headerName: 'Order ID', width: 120 , },
  { field: 'username', headerName: 'Placed By', width: 120 },
  { field: 'Creation_time', headerName: 'Order Placed', width: 150},
  { field: 'Delivered_time', headerName: 'Order Delivered', width: 150 },
  { field: 'Total_Price', headerName: 'Total Price', width: 100},
  { field: 'Order_Status', headerName: 'Status', width: 100},
  { field: 'Tax', headerName: 'Tax', width: 50},
  { field: 'isPaid', headerName: 'Payment Status', width: 120},
  { field: 'action', headerName: 'Action', width: 100, renderCell: Buttons },
]



var token = JSON.parse(localStorage.getItem("token"));




const DatatableOrders = () => {

  var [orders, setOrders] = useState([]);
  var prior = [];
  var [data, setData] = useState([]);
  var [data2, setData2] = useState([]);
  var [final, setFinal] = useState([]);
 





useEffect(() => {
  
if(token){
const view = async() => {
   await getOrders().then((response) => {
       console.log(response.data);
       setData(response.data.Orders) 
  })
  }
view()
}
}, [token])




useEffect(() => {
  
  const view2 = async() => {
       var name = "";
       var paid = "";
    for(var item in data){
      await getUsersById(data[item].User_ID).then((response) => {
       name = response.data.user.username;
      })
          if(data[item].isPaid === true){
            paid = "paid"
          }
          else {
            paid = "not paid"
          }

      var json = {
        _id: data[item]._id,
        Order_Status: data[item].Order_Status,
        User_ID: data[item].User_ID,
        Creation_time: data[item].Creation_time,
        Delivered_time: data[item].Delivered_time,
        Total_Price: data[item].Total_Price,
        isPaid: paid,
        Tax: data[item].Tax,
        isActive: data[item].isActive,
        username: name,

      }
      prior.push(json)
    }

    setOrders(prior)
    console.log(orders)
 


  
  }

  view2()
}, [data])
 



  return (
    <div className="datatable">
      
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={orders} 
          columns={ columnOrders}
          getRowId={(row) => row._id}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          
        />
      </div>
      {/* <button className="datatablebtn" onClick={view}> View Products </button> */}
    </div>
  )
}

export default DatatableOrders