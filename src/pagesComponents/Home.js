import React, { useEffect, useState } from 'react';
import { filteredCategories, filteredProducts, getProducts } from '../store/slices/products.slice';
import { useDispatch, useSelector } from 'react-redux';
import"../styles/Home.css"
import {useNavigate} from "react-router-dom"
import axios from 'axios';

const Home = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ search, setSearch] = useState("");
    const [categories, setCategories] = useState([]);

    const products = useSelector(state => state.products)

    useEffect(() => {

        dispatch(getProducts());
        axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/products/categories")
        .then(res => setCategories(res.data.data.categories))

    },[dispatch])
    console.log(categories)

    const filterProducts= ()=> {
        dispatch(filteredProducts(search))
    }

    const selectCategory = (id)=> {
        dispatch(filteredCategories(id))
    }


    return (
        <div>
            <h1>Home</h1>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}/>
            <button onClick={filterProducts}>Send</button>
            <ul>
                {
                    categories.map(category => (
                        <li key={category.id} onClick ={() => selectCategory(category.id)}>
                            {category.name}
                        </li>
                    ))
                }
            </ul>
            <ul>
            { 
            
                products.map(product => (
                    <li 
                        className='products-card' 
                        onClick={() => navigate(`/products/${product.id}`)}
                        key = {product.id}
                    >
                        <p>{product.title} </p>
                        <img src={product.productImgs} alt="product" />
                    </li>
                ))
            }
            </ul>
        </div> 
    );
};

export default Home;