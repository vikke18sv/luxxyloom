import { configureStore } from "@reduxjs/toolkit";
import { index } from "../index";

 const store = configureStore({ reducer: index })
 
 export default store;