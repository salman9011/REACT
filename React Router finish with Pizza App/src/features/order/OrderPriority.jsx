import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

function OrderPriority({order}){
    const fetcher = useFetcher();

    return (
        <fetcher.Form method="PATCH" className="text-right">
        <Button type='primary'> Make Priority</Button>
        </fetcher.Form>
    )
}

export default OrderPriority;

// ftecher form will not navigate it simple revalidate the page , even if we have no inputs but we will use form here

//now lets write action for this form 

export async function action({request, params}){
    console.log("update");
    // now set order priority true based and we have no iputs no need to read data, no request is necessry there
    // now lets make this priorty true by jus patch request for function update order , which takes id , which we will get from params
    const data = {priority: true};
    await updateOrder(params.orderId,data)
    return null;

}

// now lets connect this action to page  or route