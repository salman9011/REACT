import accountReducer from "./accounts/AccountSlice";
import customerReducer from "./customers/CustomerSlice";
import { configureStore } from "@reduxjs/toolkit";



// 1 . now lets use RTK instead of classic redux ,it will automatically create , middleware ,action creators, and dev tools etc 

//2. install it  by using npm i @reduxjs/toolkit
const store = configureStore({
  reducer : {
    account : accountReducer,
    customer : customerReducer,
  }
})

export  default store;

// now it works same way as our classic redux , no more boilerplate code...


