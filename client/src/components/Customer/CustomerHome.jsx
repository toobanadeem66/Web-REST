import React from 'react';
// // import ButtonCartCount from '../../components/common/ButtonCartCount/ButtonCartCount';
// // import Footer from '../../elements/common/Footer/Footer';
// import Banner from "../../elements/Banner/Banner.jsx";
// import Menu from '../../elements/common/Menu/Menu';
// import { menuItemsData } from '../../elements/common/Menu/data';
import Navbar from '../../elements/common/Navbar/Navbar';
import Header from '../../elements/common/Header/Header';

const Home = () => {


  return (
    <div className = "list">
             <div className="CustomNavbar"> <Navbar/> </div>

    <div className = "listContainer">
       <h1>Welcome to Restaurant</h1>
        <div className='header'>
          <Header/>
        </div>
        
    </div>
</div>

  )
}
export default Home;

