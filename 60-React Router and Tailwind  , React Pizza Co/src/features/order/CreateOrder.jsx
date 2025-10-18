import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const cart = fakeCart;
  const formErrors = useActionData();

  // we can use this data to show error message if any error
  // console.log("isSubmitting",isSubmitting);

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input type="text" name="customer" required className="input grow" />
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center ">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
         
          {formErrors?.phone && <p className="mt-2 text-xs text-red-700 bg-red-200 rounded-md p-2">{formErrors.phone}</p>}
           </div>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center ">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input type="text" name="address" required className="input w-full" />
          </div>
        </div>

        <div className="mb-12 flex items-center gap-2">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority" 
            id="priority"
          // value={withPriority}
          // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">Want to yo give your order priority?</label>
        </div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <div>
          <Button
            disabled={isSubmitting}
            type="primary"

          >
            {isSubmitting ? "Placing order..." : "Order now"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  // lets convert it to object
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };

  //validation
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please enter a valid phone number, it might be needed to reach you";
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  console.log("bjbjhb", newOrder);

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;

//1. lets create order, when we submit data we need to submit user data and selected pizzas , for selected pizzas we have fake cart
//2. if we want to connect this form nicely with freact router we need to use From which react-router provides us
//3. now specify method , it can be post , patch and delete, but not get, we can also write the action for the path that this form will be submitted to, if we don't provide it will still go to the nearest route
//4.lets create action now
//5. as soon as we submit it will be intercepted this action func  when they are connected with router
//6. so on submit this action function will be called and pass the request that was submitted
//7. formData is jus web api it is pprovided by browser
//8. lets connect this action with route so that it will be connected with form
//9. so it was really easy to get this data out of form , by jus action method,without any js and suubmit handlers, no state variables , no loading states
//10. now lets add cart data into the action i.e., submitted into action
//11. so we can't add it directly there is way called hidden input also it is a object , but we need string so convert it into string..
//now if we console log its comming as raw data so i need to model it , priority should be true or false not on/off also cart needs to be converted back into
// the object
//12. now we have data ready to create a new order, now we have create order func api which recives new order as argument
// 13. once tha api recives the data then it returns the new data, and we can navigate to that data, but using redirect as we can't use navigate its func there not component or hook//
//14. lets handle error if phone number is not valid
//15. now to access the data returned by the component we can access it in the component where this action is connected to the route, for that we have another hook called useActionData//
// its not only used for errors we can use it for any data that we return from action func//
