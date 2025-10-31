import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice";
import Button from "../../ui/Button";

const DeleteItem = ({pizzaId}) =>{
    const dispatch = useDispatch();
    return (
        <div>
   <Button type="small" onClick ={()=>dispatch(deleteItem(pizzaId))}>Delete</Button>
        </div>
    )
}

export default DeleteItem;