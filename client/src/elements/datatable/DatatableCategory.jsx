import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from "react";
import { getUsersById } from "../../API calls/Users";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import React from "react";
//import ReactDOM from "react-dom";
import { getCategories, deleteCategory,updateCategoriesById} from '../../API calls/Categories';

const EditButton = row => {
  const [popup, setpopup] = useState(false);
  var [updatename, setUpdateName] = useState("");
  var [updateparent, setUpdateparent] = useState("");
  var[catid,setcatid]=useState("");

  const update = () => {
    updateCategoriesById(catid,updatename,updateparent).then((response)=>{
      console.log(response.data)
    })
  };

  const togglePopup = () => {
    setpopup(!popup);
    setUpdateName(row.row.Cat_Name)
    setUpdateparent(row.row.Parent_Name)
    setcatid(row.row._id)
    console.log(catid)

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
              <label>Category Name:</label>
              <input type="text" placeholder={updatename}
                value={updatename}
                onChange={(e) => setUpdateName(e.target.value)} />
              <br />
              <label>Sub Category of: </label>
              <input type="text" placeholder={updateparent}
                value={updateparent}
                onChange={(e) => setUpdateparent(e.target.value)} />
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
      
      <div style={{ height: 500, width: '100%' }}>
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
        <button onClick={handleSearch}>Search</button>
        <button onClick={resetSearch}>Reset Data</button>
      </div>

      
    </div>
  )
}

export default DatatableCategory