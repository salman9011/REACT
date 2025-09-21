 import { combineReducers, createStore } from 'redux';

const intialStateAccount ={
    balance: 0,
    loan : 0,
    loanPurpose: '',
}

const intialStateCustomer={
    fullName: '',
    nationalId: '',
    createdAt:''
}
 function accountReducer(state = intialStateAccount, action) {
    switch(action.type){
        case 'balance/deposit':
            return {
                ...state,
                balance: state.balance + action.payload
                // spread the current state then add current balance with the payload
            };
        case 'balance/withdraw':
            return {
                ...state,
                balance: state.balance - action.payload
                // spread the current state then subtract current balance with the payload
            };
        case 'loan/take':
            if(state.loan > 0)  return state;
            // if there is already a loan, return the current state because we can't take another loan
            return {
                ...state,
                loan: state.loan + action.payload.amount,
                loanPurpose: action.payload.purpose
                // spread the current state then add current loan with the payload amount and set the purpose
            };
            case 'loan/pay':
            if(state.loan <= 0) return state;
            // if there is no loan, return the current state because we can't pay a loan that
            return{
                ...state,loan:0,
                loanPurpose: '',
                balance: state.balance - state.loan
            }

            default:
                return state;

    }
 }

function customerReducer(state=intialStateCustomer, action){
    switch(action.type){
        case 'customer/create':
            return{
                ...state,
                fullName: action.payload.fullName,
                nationalId : action.payload.nationalId,
                createdAt: new Date().toISOString()
            };
        case 'customer/update':
            return{
                ...state, fullName: action.payload.fullName,
            }
        default:
            return state;
    }
}





 // this is the reducer function that takes the current state and an action, and returns a new state based on the action type
 // this is how we manage the state of our application as usual usage of useReducer in react

//  now lets create store for it using redux
//  to install redux now type npm install redux

// lets create a store by using the createStore function from redux 
// but this method is deprecated now and are no longer used but for reading purpose and understanding how redux works we will use it

// !const store = createStore(reducer);
// now on this store we can dispatch actions to change the state of our application
// we can also subscribe to the store to get the current state of the application
// ?store.dispatch({type: 'balance/deposit', payload: 1000});
// console.log(store.getState());
// // this will show the current state of our store in the console
// ?store.dispatch({type: 'balance/withdraw', payload: 500});
// console.log(store.getState());
// // this will show the current state of our store in the console
// ?store.dispatch({type: 'loan/take', payload: {amount: 5000, purpose: 'car'}});
// console.log(store.getState());
// // this will show the current state of our store in the console
// ?store.dispatch({type: 'loan/pay'});


//for creating 2nd reducer
//! now if we want to use this customer reducer with the store we have to combine the reducers for this we will use combineReducers from redux

const rootReucer = combineReducers({
    account: accountReducer,
    customer: customerReducer
});
const store = createStore(rootReucer);


//! now writing action creators for the above actions , we don't want to write again and again lets create a function to generate the action
function desposit(amout){
    return {
        type: 'balance/deposit',
        payload: 1000 // this is the amount we want to deposit
    }
}
function withdraw(){}
function takeLoan(){}
function payLoan(){}
// now we can use these action creators to dispatch actions to the store
store.dispatch(desposit(500));
console.log(store.getState());
// this will show the current state of our store in the console

// ? this is how action functions where created , back in days we used to write action creators Capitalzed and store in separate file,
//?like BALANCE_DEPOSIT = 'balance/deposit' and then use it in the action creator function like this


//! LETS NOW CREATE A ANOTHER REDUCER FOR CUSTOMER 
function createCustomer(fullName, nationalId){
    return {
        type: 'customer/create',
        payload: {
            fullName,
            nationalId
        }
    };
}

function updateCustomer(fullName){
    return {
        type: 'customer/update',
        payload: {
            fullName
        }
    };
}

store.dispatch(createCustomer('John Doe', '1234567890'));
console.log(store.getState());
store.dispatch(updateCustomer('salman'));
console.log(store.getState());


// this is how we create action creators for the customer reducer