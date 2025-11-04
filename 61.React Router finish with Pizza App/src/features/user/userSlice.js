import { createAsyncThunk, createSlice, isFulfilled } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";
function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

//  ?1. getPosition returns a Promise.
// When called, it invokes navigator.geolocation.getCurrentPosition, which tries to get the user's geographical position.
// If the position lookup is successful, the promise is resolved with the position object.
// If it fails (for example, the user denies permission), the promise is rejected.
// This allows you to use await getPosition() in async functions to get the user's latitude and longitude or handle errors, integrating smoothly with modern JavaScript async/await patterns.


// ?2.now this func is async so we can't call it inside the reducer  for that we have to use thunk redux is sync by nature 
// thunk is middleware that sits b/w the diapatch and reducers itself, so it does something to dispatched action before sending it to store
//
// async function fetchAddress() {
//   // 1) We get the user's geolocation position
//   const positionObj = await getPosition();
//   const position = {
//     latitude: positionObj.coords.latitude,
//     longitude: positionObj.coords.longitude,
//   };

//   // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
//   const addressObj = await getAddress(position);
//   const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

//   // 3) Then we return an object with the data that we are interested in
//   return { position, address };
// }


//?3. lets create a thunk, it takes 2 values the name of action and the async func that returns payload for reducer later


//now this fetch address will be action creator func , which we will later call in our code
// async names should not be called with get as they are reserved for selectors 
// now the beauty od thunk is it will produce 3 additional action types , pending, fullfilled and rejected
export const fetchAddress = createAsyncThunk('user/fetchAddress', async function(){

  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  // 3) Then we return an object with the data that we are interested in , it will be payload of fullfilled state
  return { position, address };
  
})

//? 4 lets connect the thunk with reducers

const initialState = {
  username: '',
  status : 'idle',
  position:{},
  address:'',
  error:'',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser(state, action) {
      state.username = action.payload;
    },
  },

  // this is how we take extra reducers first we handle pending state and all 2 , because thunk gives 3 states
  extraReducers:(builder) =>builder.addCase(fetchAddress.pending,(state,action)=>{state.status = 'loading'}).addCase(fetchAddress.fulfilled,(state,action)=>{
    state.position = action.payload.position;
    state.address = action.payload.address;

    state.status ='idle'
  }).addCase(fetchAddress.rejected,(state,action)=>{
    state.status = 'error',

    state.error=  action.error.message;
  })
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
// lets give this reducer to store now and it is default export we can import it with any name //