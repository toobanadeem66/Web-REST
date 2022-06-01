import Sidebar from "../../elements/sidebar/sidebar.jsx";
import Navbar from "../../elements/navbar/navbar.jsx";
import { useState, useEffect } from "react";
import Datatable from "../../elements/datatable/Datatable";
import { AddFoodItems } from "../../API calls/FoodItems";
import { getCategories } from "../../API calls/Categories";

const ManageProduct = () => {
  var [ProductName, setProductName] = useState("");
  var [ProductPrice, setProductPrice] = useState("");
  var [ProductDesc, setProductDesc] = useState("");
  var [ProductCategory, setProductCategory] = useState("");
  var [R_ID, setR_ID] = useState("");
  var [updateURL, setUpdateURL] = useState("");
  var [foodid, setUpdateID] = useState("");
  const [popup, setpopup] = useState(false);
  const [Categories, setCategories] = useState([]);
  const [CategoryNames, setCategoryName] = useState([]);//has all category names to show in category dropdown
  var prior =[];

  //call this when need to list down items in dropdown
  const allcategories = () =>{
    getCategories().then((response)=>{
      setCategories(response.data.categoryData)
    })
    for (var item in Categories) {
      const categoryname = Categories[item].Cat_Name
      prior.push(categoryname)
    }
    setCategoryName(prior);
    return CategoryNames;
  }

  const update = () => {
    AddFoodItems(ProductName,ProductCategory,ProductPrice,updateURL,ProductDesc,R_ID).then((response) => {
      console.log(response.data)

    })

  };

  const togglePopup = () => {
    setpopup(!popup);

  };


  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable />
        <>
          <button className="addBTN"
            onClick={togglePopup}>
            Add Product
          </button>
          {popup && (
            <div className="modal">
              <div onClick={togglePopup} className="overlay"></div>
              <div className="modal-content">
                <form onSubmit={update}>              
              <label>Product Name:</label>
              <input type="text" placeholder={""} 
              value={ProductName}
              onChange={(e) => setProductName(e.target.value)}/>
              <br />
              <label>Category: </label>
              <input type="text" placeholder={""}
              value={ProductCategory} 
              onChange={(e) => setProductCategory(e.target.value)}/>
              <br />
              <label>Price: </label>
              <input type="text" placeholder={""}
              value={ProductPrice} 
              onChange={(e) => setProductPrice(e.target.value)}/>
              <br />
              <label>Picture url: </label>
              <input type="text" placeholder={"Enter URL of Picture"} 
              value={updateURL}
              onChange={(e) => setUpdateURL(e.target.value)}/>
              <br />
              <label>Description: </label>
              <input type="text" placeholder={ProductDesc} 
              value={ProductDesc}
              onChange={(e) => setProductDesc(e.target.value)}/>
              <br />
              <label>R_ID: </label>
              <input type="text" placeholder={""} 
              value={R_ID}
              onChange={(e) => setR_ID(e.target.value)}/>
              <br />
              <input type="submit" value="Add Product" />
            </form>
                  
                <button className="close-modal" onClick={togglePopup}>
                  CLOSE
                </button>
              </div>
            </div>
          )}

        </>
      </div>
    </div>
  )
}

export default ManageProduct;