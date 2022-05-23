import "./datatable.scss";
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from "react";
import axios from "axios";
import { display } from "@mui/system";

const columns = [
    { field: '_id', headerName: 'Item ID', width: 120},
    { field: 'Item_Name', headerName: ' Item Name', width: 130 },
    { field: 'Cat_Name', headerName: 'Category', width: 130 },
    { field: 'Item_price', headerName: 'Item Price', width: 130 },
    { field: 'Item_picture', headerName: 'Item Picture', width: 140 },
    { field: 'Item_desc', headerName: 'Item Description', width: 130 },
    { field: 'action', headerName: 'Action', width: 130 },
  ];
  

  


const Datatable = () => {


  

    var [catName, setCatName] = useState("");
    var [data, setData] = useState([]);

   async function view() {
       const token = JSON.parse(localStorage.getItem('token'));
      console.log(token)

        

        await axios.get("http://localhost:3000/Food_item", { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {
                
          var prior = [];

                for(var item in res.data.Food_items){
                    // catName
                    
                    // get the category name
                   getCatName(res.data.Food_items[item].Cat_id).then(result =>{
                      
                      return setCatName(result);
                      
                    })


                    
                    console.log(catName)
                    // json mapping
                   var  json = {
                      _id: res.data.Food_items[item]._id,
                      Item_Name: res.data.Food_items[item].Item_Name,
                      Item_price: res.data.Food_items[item].Item_price,
                      Item_picture: res.data.Food_items[item].Item_picture,
                      Item_desc: res.data.Food_items[item].Item_desc,
                      Cat_Name: catName
                  }
                  console.log(json)
                  prior.push(json)
              }

        
              console.log(prior)
            setData(prior);




     

    
                
        })
        .catch(err => {
            console.log(err)
        })




}

async function getCatName (id){
  console.log(id)
     const token = JSON.parse(localStorage.getItem('token'));
     var catName = "";
   await axios.get(`http://localhost:3000/Category/${id}`, { headers: {"Authorization" : `Bearer ${token}`} })
     .then(res => {
 
       console.log( res.data.categoryData.Cat_Name)
         catName = res.data.categoryData.Cat_Name;
 
        
     })
     .catch(err => {
         console.log(err)
     })
     return catName;
 }







  return (
    <div className="datatable">
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        
        rows={data}
        columns={columns}
        getRowId = {(row) => row._id}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
      <button className="datatablebtn" onClick={view}> View Products </button>
    </div>
  )
}

export default Datatable