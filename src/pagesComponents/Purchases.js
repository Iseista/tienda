import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPurchases } from '../store/slices/purchases.slice';

const Purchases = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const purchases = useSelector(state => state.purchases);
    // console.log(purchases)

    useEffect(()=> {
        dispatch(getPurchases());

    },[dispatch])
    return (
        <div>
             <h1>Purchases</h1>

             <ul>
                 {
                     
                         purchases.map(purchase => (
                             <li key={purchase.id}>
                                 {purchase.createdAt}
                                 <ul>
                                     {purchase.cart.products.map(product=>(
                                 
                                 <li 
                                 key={product.id}
                                 onClick={()=>navigate(`/products/${product.id}`)}
                                 >
                                     {product.title}
                                </li>
                                 
                                      ))}
                                </ul>
                             </li>
                          
                        ))
                   
                 }
             </ul>
        </div>
    );
};

export default Purchases;