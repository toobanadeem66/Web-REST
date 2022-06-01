import Sidebar from "../../elements/sidebar/sidebar.jsx";
import Navbar from "../../elements/navbar/navbar.jsx";
import DatatableCategory from "../../elements/datatable/DatatableCategory.jsx";
import "./ManageCategory.scss";
import { useState, useEffect } from "react";

const ManageCategory = () => {
  const [popup, setpopup] = useState(false);

  const update = () => {
    
  };

  const togglePopup = () => {
    setpopup(!popup);

  };


    return (
      <div className = "list">
          <Sidebar/>
          <div className = "listContainer">
              <Navbar/>
              <DatatableCategory/>
              <>
          <button className="addBTN"
            onClick={togglePopup}>
            Add Category
          </button>
          {popup && (
            <div className="modal">
              <div onClick={togglePopup} className="overlay"></div>
              <div className="modal-content">
          
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
  
  export default ManageCategory;