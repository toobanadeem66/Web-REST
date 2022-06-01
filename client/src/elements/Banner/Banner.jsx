import React from 'react';
import './Banner.scss';
import Logo from '../common/Logo/Logo';

const Banner = ({ handleScrollMenu }) => (
  <header>
    <div className='header-content'>
      <Logo />
      <div className='content-main'>
        <h1>Delicious food for your cravings</h1>
        <p>We made fresh and healthy meals with different recipes</p>
        <button onClick={handleScrollMenu}>
          View Menu <i className='fas fa-long-arrow-alt-right'></i>
        </button>
      </div>
    </div>
    <img className='header-img' src="https://img.freepik.com/free-psd/fast-food-restaurant-banner-template_23-2148987500.jpg?w=2000" alt='banner' />
  </header>
);

export default Banner;