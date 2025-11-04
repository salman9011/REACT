import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utilities/helpers";
import { addItem, getIndividualQuantitiyByID } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currentQuantitiy = useSelector(getIndividualQuantitiyByID(id))
  //now compute another state based on item is in cart
  const isIncart = currentQuantitiy >0;
  function handleAddToCart(){
    const newItem={
      pizzaId:id,
      name:name,
      quantity:1,
      unitPrice,
      totalPrice:unitPrice*1,
    }
    dispatch(addItem(newItem));

  }


  return (
    <li className="flex gap-4 py-2 ">
      <img src={imageUrl} alt={name} className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`} />
      <div className="flex flex-col grow pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm italic text-stone-500 capitalize">{ingredients.join(', ')}</p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? <p className="text-sm">{formatCurrency(unitPrice)}</p> : <p className="text-sm uppercase font-medium text-stone-500 ">Sold out</p>}
         {/* // now show delete only if item is in cart */}
         {isIncart && (<div className="flex items-center gap-3 sm:gap-8"><UpdateItemQuantity currentQuantity={currentQuantitiy} pizzaId={id}/> <DeleteItem pizzaId ={id}/></div>)}
       
         {!soldOut && !isIncart && ( <Button className='flex' type="small" onClick ={handleAddToCart}>Add to cart</Button>)}

        </div>

      </div>
    </li> 
  );
}

export default MenuItem;
