import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from "react";
import { getUsersById } from "../../API calls/Users";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import React from "react";
import ReactDOM from "react-dom";
import { getCategories, deleteCategory } from '../../API calls/Categories';

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
  const response = await deleteCategory(id);
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

// add category
const addCategory = () => {
  
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
  var prior1 = [];
  var [data, setData] = useState([]);
  var [categories, setCategory] = useState([]);
  var [original, setoriginal] = useState([]);
  var [search, setSearchTerm] = useState([]);


  const resetSearch = async (e) => {
    setCategory(original)
    setSearchTerm("")
  }
  
  const handleSearch = async (e) => {
    for (var item in categories) {
      if (categories[item].Cat_Name.toLowerCase().includes(search.toLowerCase()) && search != "") {
          prior1.push(categories[item])  
      }
    }
    setCategory(prior1);
    
  }

useEffect(() => {
  
if(token){

  const view = async() => {
   await getCategories().then((response) => {

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

      setCategory(prior);
      setoriginal(prior);
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

      <div className="add_btn">
        <button className="add_btn"
          onClick={() => {
            //  Add
            console.log("Add")
            addCategory()
          }}
        >
          <strong>Add Category</strong>
        </button>
      </div>
    </div>
  )
}

export default DatatableCategory