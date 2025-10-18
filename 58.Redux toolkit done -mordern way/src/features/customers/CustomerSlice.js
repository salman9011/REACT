import { createSlice } from "@reduxjs/toolkit";

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name : "customer",
  initialState : initialStateCustomer,
 reducers: {
createCustomer: {
  prepare(fullName,nationalID){
    return {
      payload: { fullName,nationalID, createdAt : new Date().toISOString(),
    },
  };
  },

  reducer(state, action){
    state.fullName = action.payload.fullName;
    state.nationalID = action.payload.nationalID;
    state.createdAt = action.payload.createdAt;
  }

},
  updateName(state,action){
 state.fullName = action.payload;
  },
 },

})
export  const {createCustomer,updateName}  = customerSlice.actions;
export default customerSlice.reducer;

