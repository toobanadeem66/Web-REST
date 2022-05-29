import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from "react";
import {getUsersById} from "../../API calls/Users";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import React from "react";
import { getCategories } from '../../API calls/Categories';




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

const columnCategory = [
  { field: '_id', headerName: 'Category ID', width: 200, },
  { field: 'Cat_Name', headerName: 'Category Name', width: 120 },
  { field: 'Cat_ID', headerName: 'Subcategory ID', width: 120 },
  { field: 'Parent_Name', headerName: 'Parent Category', width: 150},
  { field: 'action', headerName: 'Action', width: 100, renderCell: Buttons },
  
]



var token = JSON.parse(localStorage.getItem("token"));




const DatatableCategory = () => {

  var prior = [];
  var [data, setData] = useState([]);
  var [categories, setCategory] = useState([]);
 





useEffect(() => {
  
if(token){

  const view = async() => {
   await getCategories().then((response) => {

      var parentid = "";
      var categories = response.data.categoryData

      setData(categories);

  })
  }

view()
}
}, [token])


useEffect(() => {

  
    const view = async() => {
      var parentid = "";
      for(var item in data){
        if(data[item].Parent_id === -1){
          parentid = "No Parent";
        }else{
          for(var item2 in data){
            if(data[item].Parent_id === data[item2].Cat_ID){
              parentid = data[item2].Cat_Name;
            }
          }
        }
        var obj = {
          _id: data[item]._id,
          Cat_Name:data[item].Cat_Name,
          Cat_ID:data[item].Cat_ID,
          Parent_Name: parentid,

        }
        prior.push(obj);
      }

      console.log(prior)
      setCategory(prior);



    }
    
  
  view()

  }, [data])






 



  return (
    <div className="datatable">
      
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={categories} 
          columns={ columnCategory}
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

export default DatatableCategory