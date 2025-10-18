const { createSlice } = require("@reduxjs/toolkit");


const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading : false,
};

//1. now lets use a redux toolkit  now no more action creators and switch cases , it will handle automatically
//2. create slice accept the object of options
//3. in the end it will return a slice
const accountSlice = createSlice({

  //4. lets use name of slice first 
  name : "account",
  initialState,

  reducers:{
//5. it has multiple multiple reducers per action , so it recives currrent state and action

deposit(state,action){

  state.balance +=   action.payload;
  state.isLoading = false;

},
withdraw(state, action){
  state.balance -= action.payload;
},
requestLoan: {
prepare(amount, purpose){
  //9. so return new object which will become payload object to new reducer
return {
  payload : {amount, purpose}
}
},
  reducer(state, action){
  if(state.loan > 0) return ;
  state.loan = action.payload.amount;
  state.loanPurpose = action.payload.purpose;
  state.balance = state.balance + action.payload.amount;

}},

payLoan(state){
   state.balance -= state.loan;
  state.loan = 0;
  state.loanPurpose ='';
 
},

convertingCurrency(state){
state.isLoading = true;
},

  },

});

//10. lets add thunk, but we didn't really do it with react toolkit way, but this is fine ,
//  we didn't use automatic action creator actually created by slice , but we used our own

export function deposit(amount, currency) {
  if(currency === "USD") {
  return { type: "account/deposit", payload: amount };
}

return  async function convertToUSD (dispatch, getState){ 


    dispatch({type:"account/convertingCurrency"});

  //api call
 const res =  await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
 const data = await res.json();
// console.log(data);
const convertedAmount = data.rates.USD;

// so the above function will act as middleware between dispatch action and store
  dispatch({ type: "account/deposit", payload: convertedAmount });

}
}

//6.now if we console log we have action creators and reducers , so lets export them

export const { withdraw, requestLoan,payLoan} = accountSlice.actions;

export default accountSlice.reducer;

console.log(requestLoan , "kjdkwkd");


//7. this request loan has ,,more than one parameter, but these automatic action creators bidefault only accept one single arguement
//8. but there is solution , we have prepare data before it reaches to reducer