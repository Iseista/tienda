import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom"
import"../styles/ProductDetail.css"
import { useDispatch, useSelector} from "react-redux"
import { filteredCategories } from '../store/slices/products.slice';
import { addToCart } from '../store/slices/cart.slice';



const ProductDetail = () => {

    const [itemProduct, setItemProduct] = useState([]);
    const [ quantity, setQuantity] = useState("");

    const {id} = useParams();
    const productsList = useSelector(state => state.products);
    const dispatch = useDispatch();
    const navigate = useNavigate();
   
   
    

    useEffect(()=> {

            
        axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/products")
        .then(res => {
            const productFiltered = res.data.data.products.find(product => product.id === Number(id))
            setItemProduct(productFiltered)
            dispatch(filteredCategories(productFiltered.category.id));
        })
       

    },[dispatch, id]);

    const addCart= ()=> {
        console.log("me ejecute")
        const purchase = {
            id:id,
            quantity: quantity

        }
        console.log(purchase)
        dispatch(addToCart(purchase))
    }
 
   
    return (
        <div className='item-product'>
             <h1>{itemProduct.title}</h1>
             <input type="number"  placeholder = "rate" onChange={e => setQuantity(e.target.value)} value={quantity}/>
             <button onClick={addCart}>Add to cart</button>
             <img src={itemProduct.productImgs} alt="" />
             <ul className='list-related-product'>
             {
                 productsList.map(productList => (
                     <li className='related-product'
                         onClick={() => navigate(`/products/${productList.id}`)}
                         key={productList.id}>
                         <p>{productList.title}</p>
                         <img src={productList.productImgs[1]} alt="" />
                    </li>
                 ))
             }
            </ul>
    
        </div>
    );
};

export default ProductDetail;