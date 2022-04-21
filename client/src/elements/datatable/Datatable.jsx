import "./datatable.scss";
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from "react";
import axios from "axios";

const columns = [
    { field: '_id', headerName: 'ID', width: 70 },
    { field: 'username', headerName: ' Full Name', width: 130 },
    { field: 'phoneNumber', headerName: 'Last name', width: 130 },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'address', headerName: 'Home Address', width: 140 },
    { field: 'status', headerName: 'Customer Status', width: 130 },
    { field: 'action', headerName: 'Action', width: 130 },
  ];
  
//   const rows = [
//     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//   ];
  


const Datatable = () => {

    const [rows, setRows] = useState([]);
    
 
    useEffect( async() => {

        await axios.get("http://localhost:3000/auth")
        .then(res => {
            setRows(res.data)
            console.log(res.data)
                
        })
        .catch(err => {
            console.log(err)
        })




}, [])





  return (
    <div className="datatable">
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>

    </div>
  )
}

export default Datatable