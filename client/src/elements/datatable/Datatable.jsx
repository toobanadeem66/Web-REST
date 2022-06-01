import "./datatable.scss";
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from "react";
import axios from "axios";
import { display } from "@mui/system";
<<<<<<< HEAD
import { getFoodItems, getfooditembyid } from "../../API calls/FoodItems";
=======
import { getFoodItems, deleteFoodItem, updatefooditembyid, getfooditembyid } from "../../API calls/FoodItems";
>>>>>>> da9f1624f84c87829e702c375998ba4e06ce08b0
import { getCategoriesById } from "../../API calls/Categories";
import { SettingsInputAntennaTwoTone } from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import React from "react";
<<<<<<< HEAD
//import SearchBar from "../SearchBar"
=======


const EditButton = row => {
  const categoryid = (ID) => {
     getfooditembyid(ID).then((response) => {
      setProductCategory(response.data.fooditem.Cat_id)
    })

  };
 
  var [updatename, setUpdateName] = useState("");
  var [updateprice, setUpdatePrice] = useState("");
  var [updatedes, setUpdateDesc] = useState("");
  var [foodid, setUpdateID] = useState("");
  var [ProductCategory, setProductCategory] = useState("");
  var [RID, setR_ID] = useState("");
  var [updateURL, setUpdateURL] = useState("");
  const [popup, setpopup] = useState(false);

  const update = () => {
    updatefooditembyid(foodid, updatename, updateprice, updatedes, updateURL, RID).then((response) => {
      console.log(response.data)

    })

  };

  const togglePopup = () => {
    setpopup(!popup);
    //  Edit
    categoryid(row.row._id)
    setUpdateName(row.row.Item_Name)
    setUpdatePrice(row.row.Item_price)
    setUpdateDesc(row.row.Item_desc)
    setUpdateID(row.row._id)
    setUpdateURL(row.row.Item_picture)
    setR_ID(row.row.R_ID)

  };
>>>>>>> da9f1624f84c87829e702c375998ba4e06ce08b0

  return (
<<<<<<< HEAD
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

=======
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
              <label>Product:</label>
              <input type="text" placeholder={updatename}
                value={updatename}
                onChange={(e) => setUpdateName(e.target.value)} />
              <br />
              <label>Price: </label>
              <input type="text" placeholder={updateprice}
                value={updateprice}
                onChange={(e) => setUpdatePrice(e.target.value)} />
              <br />
              <label>Description: </label>
              <input type="text" placeholder={updatedes}
                value={updatedes}
                onChange={(e) => setUpdateDesc(e.target.value)} />
              <br />
              <label>Picture url: </label>
              <input type="text" placeholder={updateURL}
                value={updateURL}
                onChange={(e) => setUpdateURL(e.target.value)} />
              <br />
              <label>Category: </label>
              <input type="text" placeholder={ProductCategory}
                value={ProductCategory}
                onChange={(e) => setProductCategory(e.target.value)} />
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
  const response = await deleteFoodItem(id);
  // console.log(response)
  window.alert(response.data.message)
  window.location.reload()
}

const Buttons = thisRow => {
  return (
    <strong>
      <EditButton row={thisRow.row} />
      <DeleteButton row={thisRow.row} />
>>>>>>> da9f1624f84c87829e702c375998ba4e06ce08b0
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
<<<<<<< HEAD

=======
  
>>>>>>> da9f1624f84c87829e702c375998ba4e06ce08b0
  var [search, setSearchTerm] = useState([]);
  var [foodItems, setFoodItems] = useState([]);
  var [original, setoriginal] = useState([]);
  var [data, setData] = useState([]);
  var prior = [];
<<<<<<< HEAD
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
=======
  var prior1 = [];

  const resetSearch = async (e) => {
    setData(original)
    setSearchTerm("")
  }

  const handleSearch = async (e) => {
    for (var item in original) {
      if (original[item].Item_Name.toLowerCase().includes(search.toLowerCase()) && search != "") {

        prior1.push(original[item])
      }
    }
    setData(prior1)

>>>>>>> da9f1624f84c87829e702c375998ba4e06ce08b0
  }

  useEffect(() => {
    const view2 = async () => {
      getFoodItems().then((response) => {
        setFoodItems(response.data.Food_items)
      })
    }
    view2()
  }, [])
<<<<<<< HEAD

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
=======

  useEffect(() => {
    var rid=localStorage.getItem("RID")
    const getProductData = async () => {
      //var i = 0;
      for (var item in foodItems) {
        if(foodItems[item].R_ID == rid){
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
      }
      setoriginal(prior)
>>>>>>> da9f1624f84c87829e702c375998ba4e06ce08b0
      setData(prior)
    }

    getProductData();
  }, [foodItems])

  //  console.log(data)
  return (
    <div className="datatable">

<<<<<<< HEAD
      <div style={{ height: 400, width: '100%' }}>
=======
      <div style={{ height: 500, width: '100%' }}>
>>>>>>> da9f1624f84c87829e702c375998ba4e06ce08b0
        <DataGrid
          rows={data}
          columns={columnsProducts
          }
          getRowId={(row) => row._id}
          pageSize={5}
          rowsPerPageOptions={[5]}
<<<<<<< HEAD
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
=======

        />
      </div>
      {/* <SearchBar placeholder="Search..." data={foodItems}/> */}
      <div className='searchdi'>
        <input type="text" placeholder="Search..."
          value={search}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={resetSearch}>Reset Data</button>
>>>>>>> da9f1624f84c87829e702c375998ba4e06ce08b0
      </div>
    </div>

  )
}

export default Datatable