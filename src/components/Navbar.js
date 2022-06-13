import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getCart } from '../store/slices/cart.slice';
import"../styles/Navbar.css"


const Navbar = () => {
    
    const[show, setShow] = useState(false);
    const navigate = useNavigate();
    const purchases = useSelector(state => state.cart.products);
    console.log(purchases)

    const handleClose= ()=> setShow(false);

    const selectPurchases = (purchase)=> {
        handleClose();
        navigate(`/products/${purchase.id}`)
    }

    const handleShow = () =>{
       
        const token=localStorage.getItem("token");
        if(token){
            setShow(!show)
        }else{
            navigate("/login")

        }
    }


    const dispatch = useDispatch();


    useEffect(()=>{
        dispatch(getCart())
    },[dispatch])

    const logout = () => localStorage.setItem("token", "")

    return (
        <div className='nav-bar'>
            <h3><Link to= "/">e-commerce</Link></h3>
            <ul className='nav-items'>
                <li><Link to= "/login">Login</Link></li>
                <li><Link to="/purchases">Purchases</Link></li>
                <li onClick={()=>handleShow()}><Link to="/purchases">Cart</Link></li>
                <li><button onClick={logout}>Log out</button></li>
            </ul>
           {
            show?
          
            <div className='side-bar'>
                <p>Purchase</p>
                {
                    purchases.map( purchase => (
                        <li 
                            key={purchase.id}
                            onClick={()=>selectPurchases(purchase)}
                        >
                            {purchase.title}
                        </li>
                    ))
                }
            </div>: <div></div>
             }
           
           
        </div>
    );
};

export default Navbar;