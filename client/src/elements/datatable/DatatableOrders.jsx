import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from "react";
import axios from "axios";
import { display } from "@mui/system";
import { getOrders, deleteOrder,updateOrder } from "../../API calls/Orders";
import { getUsersById } from "../../API calls/Users";
import { SettingsInputAntennaTwoTone } from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';



const EditButton = row => {
  const [popup, setpopup] = useState(false);
  const [status, setStatus] = useState("");
  const [paymentstatus, setpaymentstatus] = useState(false);
  const[orderId,setorderid] =useState("");
  const[delivered, setdelivered] =useState("");

  const update = () => {
    updateOrder(orderId,paymentstatus,status, delivered).then((response) => {
      console.log(response.data)

    })
  };

  const togglePopup = () => {
    setpopup(!popup); 
    setorderid(row.row._id)    
    setStatus(row.row.Order_Status)
    setpaymentstatus(row.row.isPaid)
    setdelivered(row.row.isDelivered)

    
  };

  const handleChangeOrderStatus = (event) => {
    setStatus(event.target.value);
    // console.log(event.target.value)
          if(event.target.value === "delivered"){
      console.log("in")
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date+' '+time;
        console.log(dateTime)
      setdelivered(dateTime)
    
    }
    // console.log(delivered)
  };

  const handleChangePaymentStatus = (event) => {
    setpaymentstatus(event.target.value);
  };



  return (
    <>
      <button className="DT_Btn"
        onClick={togglePopup}>
        < EditIcon className="DTicon" />
      </button>

      {popup && (
        <div className="modal">
          <div onClick={togglePopup} className="overlay"></div>
          <div className="modal-content">
            <form onSubmit={update}>
            <label>Order Status:</label>
            <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Order Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Age"
          onChange={handleChangeOrderStatus}
        >
          <MenuItem value={"delivered"}>delivered</MenuItem>
          <MenuItem value={"cancelled"}>cancelled</MenuItem>
          <MenuItem value={"prepared"}>prepared</MenuItem>
          <MenuItem value={"out for delivery"}>out for delivery</MenuItem>
        </Select>
      </FormControl>
    </Box>
              <br />
              <label>Payment Status: </label>
              <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Payment Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={paymentstatus}
          label="Age"
          onChange={handleChangePaymentStatus}
        >
          <MenuItem value={true}>Paid</MenuItem>
          <MenuItem value={false}>Pending</MenuItem>
        </Select>
      </FormControl>
    </Box>
              <br />
              <input type="submit" value="Update" />
            </form>
            <button className="close-modal" onClick={togglePopup}>
              CLOSE
            </button>
          </div>
        </div>
      )}

    </>

  );
}

const DeleteButton = row => {
  return (
    <button className="DT_Btn"
      onClick={() => {
        // Delete
        console.log("Delete : " + row.row.Cat_Name)
        console.log("Delete : " + row.row._id)

        // show confirmation dialog
        // if confirmed, delete
        window.confirm('Are you sure you wish to delete this item?')
          ? deleteItem(row.row._id.toString().trim())
          : console.log("cancel")

      }}
    >
      <DeleteOutlineOutlinedIcon className="DTicon" />
    </button>
  );
}
const deleteItem = async (id) => {
  console.log("confirm delete")
  console.log("Delete : " + id)
  const response = await deleteOrder(id);
  // console.log(response)
  window.alert(response.data.message)
  window.location.reload()
}

const Buttons = thisRow => {
  return (
    <strong>
      <EditButton row={thisRow.row} />
      <DeleteButton row={thisRow.row} />
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
  var [original, setoriginal] = useState([]);
  var [search, setSearchTerm] = useState([]);
  var prior1 = [];

  const resetSearch = async (e) => {
    setOrders(original)
    setSearchTerm("")
  }
  
  const handleSearch = async (e) => {
    for (var item in orders) {
      if (orders[item].username.toLowerCase().includes(search.toLowerCase()) && search != "") {
          prior1.push(orders[item])  
      }
    }
    setOrders(prior1);
  }


useEffect(() => {
  
if(token){
const view = async() => {
   await getOrders().then((response) => {
       console.log(response.data);
       setData(response.data.Orders) // data coming
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
      if(data[item].isActive){
        console.log(data[item].User_ID)
      await getUsersById(data[item].User_ID).then((response) => {
       name = response.data.user.username;
 
      })
      console.log(name)
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
  }

  console.log(prior)
    setOrders(prior)
    console.log(orders)
    setoriginal(prior)
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
          
        />
      </div>
      <div clasName='searchdi'>
        <input type="text" placeholder="Search..."
          value={search}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
        <button onClick={handleSearch}>Click Me!</button>
        <button onClick={resetSearch}>Reset Data</button>
      </div>
      {/* <button className="datatablebtn" onClick={view}> View Products </button> */}
    </div>
  )
}

export default DatatableOrders