import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPrice, getTotalQuantity } from "./cartSlice";

function CartOverview() {
//  const totalPrice = useSelector((state)=>state.cart.cart.reduce((sum,item)=>sum+item.totalPrice,0));
//  const totalCartQuantitiy = useSelector((state)=> state.cart.cart.reduce((count,item)=> count+item.quantity,0 ))

 // our reducer nsame is cart and also we have cart object so that is why cart.cart
 // useSelector recomemded to use the  select funtion inside the slice file

 const totalPrice = useSelector(getTotalCartPrice)
 const totalCartQuantitiy = useSelector(getTotalQuantity)
  return (
    <div className="bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base flex items-center justify-between">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalCartQuantitiy} pizzas</span>
        <span>${totalPrice}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
