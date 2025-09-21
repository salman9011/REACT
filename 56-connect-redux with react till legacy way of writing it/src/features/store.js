import { combineReducers, createStore } from "redux";
import accountReducer from "./accounts/AccountSlice";
import customerReducer from "./customers/CustomerSlice";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);


//1 . now what we did we create slices of the state then we export them in store , lets give whole app accesss to this store 
//2 . now we need to provide this store to the whole app so we will go to index.js and import provider from react-redux and wrap our app with provider and pass store as a prop

export default store;

// now lets connect redux with react app for that we will install react-redux and go to index.js