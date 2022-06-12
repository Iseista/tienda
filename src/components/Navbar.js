import React from 'react';
import { Link } from 'react-router-dom';
import"../styles/Navbar.css"

const Navbar = () => {
    return (
        <div className='nav-bar'>
            <h3>e-commerce</h3>
            <ul className='nav-items'>
                <li><Link to= "/login">Login</Link></li>
                <li><Link to="/purchases">Favorite</Link></li>
                <li><Link to="/purchases">Favorites2</Link></li>
            </ul>
              
        </div>
    );
};

export default Navbar;