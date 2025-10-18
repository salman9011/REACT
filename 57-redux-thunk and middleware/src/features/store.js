import { applyMiddleware, combineReducers, createStore } from "redux";
import accountReducer from "./accounts/AccountSlice";
import customerReducer from "./customers/CustomerSlice";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));


//1 . now what we did we create slices of the state then we export them in store , lets give whole app accesss to this store 
//2 . now we need to provide this store to the whole app so we will go to index.js and import provider from react-redux and wrap our app with provider and pass store as a prop

export default store;

// now lets connect redux with react app for that we will install react-redux and go to index.js


//3. lets now intall redux thunks and add it to the store
//4. for that we need to import applyMiddleware from redux and thunk from redux-thunk
//5. then we will pass it to createStore as a second argument
//6. so we told our store that we are going to use thunk as a middleware in our application 
//7 lets go to action creator that is responsible for deposit money and make it async action creator