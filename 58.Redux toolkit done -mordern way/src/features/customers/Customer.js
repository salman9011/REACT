import { useSelector } from "react-redux";

function Customer() {
const customer  = useSelector((store)=>store.customer.fullName);

  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;


//1. lets read the state from redux store for that we will use useSelector hook from react-redux
//2 it takes call back  that callback will be single argument which is the entire redux state
//3. use selector jus creates subscription to the store .
//4 so whenevr the store chnages the component that is subscried to that store will re render
//5. so here whenevr the customer state changes this component will re render
// ? 6. now lets dispatchb actions now , for that we will start from create customer file