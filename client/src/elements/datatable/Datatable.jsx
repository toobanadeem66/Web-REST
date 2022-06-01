import "./datatable.scss";
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from "react";
import axios from "axios";
import { display } from "@mui/system";
import { getFoodItems, getfooditembyid } from "../../API calls/FoodItems";
import { getCategoriesById } from "../../API calls/Categories";
import { SettingsInputAntennaTwoTone } from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import React from "react";
//import SearchBar from "../SearchBar"

const Buttons = (params) => {
  return (
    <strong>
      <button className="DT_Btn"
        onClick={() => {
          console.log("delete");
        }}
      >
        < EditIcon className="DTicon" />
      </button>

      <button className="DT_Btn"
        onClick={() => {
          console.log("delete");
        }}
      >
        <DeleteOutlineOutlinedIcon className="DTicon" />
      </button>

    </strong>
  )
}

const columnsProducts = [
  { field: '_id', headerName: 'Item ID', width: 120, },
  { field: 'Item_Name', headerName: ' Item Name', width: 130 },
  { field: 'Cat_Name', headerName: 'Category', width: 130 },
  { field: 'Item_price', headerName: 'Item Price', width: 130 },
  { field: 'Item_picture', headerName: 'Item Picture', width: 140, renderCell: (params) => <div className="cell"> <img className="DT_img" src={params.value} /></div> },
  { field: 'Item_desc', headerName: 'Item Description', width: 130 },
  { field: 'action', headerName: 'Action', width: 130, renderCell: Buttons },
];

const Datatable = () => {

  var [search, setSearchTerm] = useState([]);
  var [foodItems, setFoodItems] = useState([]);
  var [data, setData] = useState([]);
  var prior = [];
  //var [data1, setData1] = useState([]);
  var prior1 = [];
  

   const resetSearch = async (e) => {
    for (var item in foodItems) {
      var name = "";
      var id = foodItems[item].Cat_id
      await getCategoriesById(id).then((response) => {
        name = response.data.categoryData.Cat_Name

      })
      //console.log(name)
      var json = {
        _id: foodItems[item]._id,
        Item_Name: foodItems[item].Item_Name,
        Item_price: foodItems[item].Item_price,
        Item_picture: foodItems[item].Item_picture,
        Item_desc: foodItems[item].Item_desc,
        Cat_Name: name
      }
      //console.log(json)
      prior.push(json)

    }
    setData(prior)
  }

  const handleSearch = async (e) => {
    for(var item in foodItems){
      if(foodItems[item].Item_Name.toLowerCase().includes(search.toLowerCase()) && search!=""){
        var name = "";
        var id = foodItems[item].Cat_id
        await getCategoriesById(id).then((response) => {
          name = response.data.categoryData.Cat_Name

        })
        var json = {
          _id: foodItems[item]._id,
          Item_Name: foodItems[item].Item_Name,
          Item_price: foodItems[item].Item_price,
          Item_picture: foodItems[item].Item_picture,
          Item_desc: foodItems[item].Item_desc,
          Cat_Name: name
        }
        prior1.push(json)
      }
    }
    setData(prior1)
    //console.log(search)
  }

  useEffect(() => {
    const view2 = async () => {
      getFoodItems().then((response) => {
        setFoodItems(response.data.Food_items)
      })
    }
    view2()
  }, [])

  useEffect(() => {

    const getProductData = async () => {
      //var i = 0;
      for (var item in foodItems) {
        var name = "";
        var id = foodItems[item].Cat_id
        await getCategoriesById(id).then((response) => {
          name = response.data.categoryData.Cat_Name

        })
        //console.log(name)
        var json = {
          _id: foodItems[item]._id,
          Item_Name: foodItems[item].Item_Name,
          Item_price: foodItems[item].Item_price,
          Item_picture: foodItems[item].Item_picture,
          Item_desc: foodItems[item].Item_desc,
          Cat_Name: name
        }
        //console.log(json)
        prior.push(json)

      }
      setData(prior)
    }

    getProductData();
  }, [foodItems])

  //  console.log(data)
  return (
    <div className="datatable">

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columnsProducts
          }
          getRowId={(row) => row._id}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
      {/* <SearchBar placeholder="Search..." data={foodItems}/> */}
      <div clasName='searchdi'>

        <input type="text" placeholder="Search..."
          value={search}
          onChange={(event) => {
            setSearchTerm(event.target.value);            
          }}
        />
        {/* if(search == ""){
              resetSearch()
            } */}
        <button onClick={handleSearch}>Click Me!</button>
         <button onClick={resetSearch}>Reset Data</button> 
      </div>
    </div>

  )
}

export default Datatable