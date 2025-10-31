import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './ui/Home';
import Menu from './features/menu/Menu';
import Cart from './features/cart/Cart';
import { loader as menuLoader } from "./features/menu/Menu";
import CreatOrder,{action as createOrderAction} from './features/order/CreateOrder';
import Order, {loader as orderLoader} from './features/order/Order';
import {action as updateOrderaction} from './features/order/OrderPriority'
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";

const router = createBrowserRouter([

  {
   element: <AppLayout/>,
     errorElement: <Error/>,
   //layout route
   children: [
     {
    path: "/",
    element: <Home/>
  },
  {
    path :"/menu",
    element: <Menu/>,
    // lets use dataloader for this menu page
    loader: menuLoader,
    // only error things can go wrong as we are fething data here
    errorElement: <Error/>
  },
  {
    path:"/cart",
    element:<Cart/>
  },
  {
    path:"/order/new",
    element: <CreatOrder/>,
    action: createOrderAction,
  },
  {
    path:"/order/:orderId", element:<Order/>,
    loader: orderLoader,
      errorElement: <Error/>,
      action:updateOrderaction,
      //the form we want to handle is not in order component but in child of order , but react router is smart enough to find it

  }
   ]
  }
 

])
function App() {
 return <RouterProvider router={router}/>
}

export default App;
