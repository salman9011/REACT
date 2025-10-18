//1.it is part of total state
//2. in each slice we colocate as much as redux logic as possible
//3. so we don't have to jump around b/w the files , as older code based have oe folder for reducer and per file for per reducer same for action creater
// 4 . so a slice contains initial state , reducer function and action creators

import { type } from "@testing-library/user-event/dist/type";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading : false,
};

//The reducers 

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload, isLoading: false};
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      // LATER
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
      case "account/convertingCurrency" :
        return {...state, isLoading: true}

    default:
      return state;
  }
}

//all action creators

export function deposit(amount, currency) {
  if(currency === "USD") {
  return { type: "account/deposit", payload: amount };
}

//8. here redux will know this is async func and before dispatch the action we have to use this as thunk, in order to later dispatch this 
// that redu will call internally with dispatch and getState as arguments

return  async function convertToUSD (dispatch, getState){ 

  //9. lets show loading state 
    dispatch({type:"account/convertingCurrency"});

  //api call
 const res =  await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
 const data = await res.json();
// console.log(data);
const convertedAmount = data.rates.USD;

// so the above function will act as middleware between dispatch action and store
  dispatch({ type: "account/deposit", payload: convertedAmount });
  // in the return the action 

  //10. here we don't have to add another state to make is loading false, because that is  beauty of use reducer//
}
}

export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

export function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}

export function payLoan() {
  return { type: "account/payLoan" };
}


