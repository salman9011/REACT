import { connect } from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay({balance}) {
  return <div className="balance">{formatCurrency(balance)}</div>;
}

function mapStateToProps(state) {
  return {
    balance: state.account.balance,
  };
}

export default connect(mapStateToProps) (BalanceDisplay);


//1 the useSlecrtor and usdispatch are mordern way of using redux with react app , before them there was legacy of using called connect api 
//2. it is a connect function  which takes in another function which in turn will return a new function  which will then accept the component as an new  argument
//3 . so it is a higher order function which returns a higher order component
//4.  this function is called mapStateToProps function which will take in the whole state and return only that part of the state which is needed by the component 
//5.  now after passsing it to connect then it will return a new function so "connect(mapStateToProps)" this will be new function and  "BalanceDisplay" will be its argument
//6. that new function is bascically a new component , that new component will have balance prop