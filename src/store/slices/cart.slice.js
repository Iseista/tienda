import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../helps/getConfig';
import { setIsLoading } from './isLoading.slice';

export const cartSlice = createSlice({
	name: 'cart',
    initialState: [],
    reducers: {
        setCart: (state, action) => {
            return action.payload
        }
        
    }
}); 

export const { setCart } = cartSlice.actions;

export const getCart = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/cart", getConfig())
        .then(res => dispatch(setCart(res.data.data.cart)))
        .finally(() => dispatch(setIsLoading(false)));
}
export const addToCart = (purchase) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/cart", purchase,getConfig())
        .then(() => {
            dispatch(getCart())
           alert("se añadio la compra")
        })
    .catch(error => {
        console.log(error.response)
        alert("ha ocurrido un error")
    })
        
        .finally(() => dispatch(setIsLoading(false)));
}

export default cartSlice.reducer;