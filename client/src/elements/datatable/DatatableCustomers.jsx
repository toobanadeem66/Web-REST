import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from "react";
import axios from "axios";
import { display } from "@mui/system";
import { getUsers, deleteUser } from "../../API calls/Users";
import { getCategoriesById } from "../../API calls/Categories";
import { SettingsInputAntennaTwoTone } from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import React from "react";



const EditButton = row => {
  return (
    <button className="DT_Btn"
      onClick={() => {
        //  Edit
        console.log("Edit : " + row.row.Cat_Name)
        console.log("Edit : " + row.row._id)
      }}
    >
      < EditIcon className="DTicon" />
    </button>
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
  const response = await deleteUser(id);
  // console.log(response)
  window.alert("Deleted Succesfully")
  window.location.reload()
}

const Buttons = thisRow => {
  return (
    <strong>
      {/* <EditButton row={thisRow.row} /> */}
      <DeleteButton row={thisRow.row} />
    </strong>
  )
}

const columnCustomer = [
  { field: '_id', headerName: 'User ID', width: 120, },
  { field: 'email', headerName: 'Email', width: 130 },
  { field: 'username', headerName: 'Full Name', width: 130 },
  { field: 'phoneNumber', headerName: 'Phone Number', width: 130 },
  { field: 'address', headerName: 'Address', width: 130 },
  { field: 'status', headerName: 'Status', width: 130 },
  { field: 'action', headerName: 'Action', width: 130, renderCell: Buttons },
]

var token = JSON.parse(localStorage.getItem("token"));

const DatatableCustomers = () => {

  var [users, setUsers] = useState([]);
  var prior = [];
  var prior1 = [];
  var [original, setoriginal] = useState([]);
  var [search, setSearchTerm] = useState([]);

  const resetSearch = async (e) => {
    setUsers(original)
    setSearchTerm("")
  }

  const handleSearch = async (e) => {
    for (var item in original) {
      if (original[item].username.toLowerCase().includes(search.toLowerCase()) && search != "") {
        prior1.push(original[item])
      }

    }
    setUsers(prior1);

  }

  useEffect(() => {

    if (token) {
      const view = async () => {

        await getUsers().then((response) => {

          for (var item in response.data.Users) {
            if ((response.data.Users[item].role.localeCompare("customer") === 0) && response.data.Users[item].status != "InActive") {
              var json = {
                _id: response.data.Users[item]._id,
                email: response.data.Users[item].email,
                username: response.data.Users[item].username,
                phoneNumber: response.data.Users[item].phoneNumber,
                address: response.data.Users[item].address,
                status: response.data.Users[item].status,
              }
              prior.push(json)
            }
          }

        })
        setUsers(prior)
        setoriginal(prior)

      }

      view()
    }

  }, [])

  return (
    <div className="datatable">

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={users}
          columns={columnCustomer
          }
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
        <button onClick={handleSearch}>Search</button>
        <button onClick={resetSearch}>Reset Data</button>
      </div>
      {/* <button className="datatablebtn" onClick={view}> View Products </button> */}
    </div>
  )
}

export default DatatableCustomers