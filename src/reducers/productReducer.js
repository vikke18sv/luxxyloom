import { createSlice } from "@reduxjs/toolkit";

const insitialState = {
    products: [],
    
}

const productReducer = createSlice({
    name: 'productReducer',
    initialState: insitialState,
    reducers: {
        setProducts: (state, {type,payload}) => {
            return {
                ...state,
                products: payload,
            }
        },
       

    }
})

export const { setProducts } = productReducer.actions;
export default productReducer.reducer;