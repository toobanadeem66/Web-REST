import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from "react";
import axios from "axios";
import { display } from "@mui/system";
import { getOrders, deleteOrder,updateOrder } from "../../API calls/Orders";
import { getUsersById } from "../../API calls/Users";
import { SettingsInputAntennaTwoTone } from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import React from "react";


const EditButton = row => {
  const [popup, setpopup] = useState(false);
  const [status, setStatus] = useState("");
  const [paymentstatus, setpaymentstatus] = useState("");
  const[orderId,setorderid] =useState("");

  const update = () => {
    updateOrder(orderId,paymentstatus,status).then((response) => {
      console.log(response.data)

    })
  };

  const togglePopup = () => {
    setpopup(!popup); 
    setorderid(row.row._id)    
    setStatus(row.row.Order_Status)
    setpaymentstatus(row.row.isPaid)
    
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
              <input type="text" placeholder={status}
                value={status}
                onChange={(e) => setStatus(e.target.value)} />
              <br />
              <label>Payment Status: </label>
              <input type="text" placeholder={paymentstatus}
                value={paymentstatus}
                onChange={(e) => setpaymentstatus(e.target.value)} />
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
      if(!data[item].isActive){
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
  }

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