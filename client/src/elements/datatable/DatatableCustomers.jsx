
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from "react";
import axios from "axios";
import { display } from "@mui/system";
import { getUsers } from "../../API calls/Users";
import { getCategoriesById } from "../../API calls/Categories";
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

const columnCustomer = [
  { field: '_id', headerName: 'User ID', width: 120 , },
  { field: 'email', headerName: 'Email', width: 130 },
  { field: 'username', headerName: 'Full Name', width: 130 },
  { field: 'phoneNumber', headerName: 'Phone Number', width: 130 },
  { field: 'address', headerName: 'Address', width: 130},
  { field: 'status', headerName: 'Status', width: 130 },
  { field: 'action', headerName: 'Action', width: 130, renderCell: Buttons },
]



var token = JSON.parse(localStorage.getItem("token"));




const DatatableCustomers = () => {


  var [users, setUsers] = useState([]);
  var prior = [];

 





useEffect(() => {
  
if(token){
const view = async() => {

   await getUsers().then((response) => {

    for(var item in response.data.Users){
    if(response.data.Users[item].role.localeCompare("customer") === 0){
      var json = {
        _id: response.data.Users[item]._id,
        email: response.data.Users[item].email,
        username: response.data.Users[item].username,
        phoneNumber: response.data.Users[item].phoneNumber,
        address: response.data.Users[item].address,
        status: response.data.Users[item].status,
      }
      prior.push(json)
    } }

  })
  setUsers(prior)

  }

view()
}

}, [])

console.log(users)


  return (
    <div className="datatable">
      
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={users} 
          columns={ columnCustomer
          }
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

export default DatatableCustomers