import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer"

export const index = combineReducers({
    productReducer : productReducer,
    cartReducer : cartReducer
})