import React from 'react';
import Navbar from '../../elements/common/Navbar/Navbar';
import Header from '../../elements/common/Header/Header';

const Home = () => {

  React.useEffect(() => {
    localStorage.setItem("CRID",2)
  })

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

