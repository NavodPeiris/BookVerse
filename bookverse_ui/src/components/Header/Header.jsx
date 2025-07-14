import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import SearchForm from "../SearchForm/SearchForm";
import "./Header.css";
import FeaturedBookList from '../BookList/FeaturedBookList';

const Header = () => {
  const location = useLocation();
  const path = location.pathname;
  const showFeatured = path === '/' || path === '/book';

  return (
    <div className='holder'>
        <header className='header'>
            <Navbar />
            <div className='header-content flex flex-c text-center text-white'>
                <h2 className='header-title text-capitalize'>find your book of choice.</h2><br />
                <p className='header-text fs-18 fw-3'>Browse growing number of book collections and embark on an epic journey</p>
                <SearchForm />
            </div>
            {showFeatured && <FeaturedBookList />}
        </header>
    </div>
  )
}

export default Header