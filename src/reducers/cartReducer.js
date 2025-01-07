import { createSlice } from "@reduxjs/toolkit";

const insitialState = {    
    cart_products : [],
    cart_length: 0,
}
const cartReducer = createSlice({
    name: 'cartReducer',
    initialState: insitialState,
    reducers: {
    setCartProducts : (state, {type,payload}) => {
        let is_product_exists = [...state.cart_products].find((item) => item.id === payload.id);
        let updated_products;
        if(is_product_exists){
            updated_products = state.cart_products.map((item) => item.id === payload.id ? {...item, quantity: item.quantity + 1} : item); 
        }else{
            updated_products = [...state.cart_products, {...payload, quantity: 1}];
        }
        return {
            ...state,
            cart_products: updated_products,
            cart_length: updated_products.length                
        }
    },
}})
export const { setCartProducts } = cartReducer.actions;
export default cartReducer.reducer;
