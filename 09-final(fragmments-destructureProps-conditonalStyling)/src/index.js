import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";
const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];


function App(){
  return (
   <div className='container'>
    <Header />
    <Menu />
    <Footer/>
    </div>

  )
}
function Header() {
  return(
    <header className='header'>
      <h1>Fast React Pizza co.</h1>
    </header>

  )
}
function Menu () {
  const numsPizza = pizzaData.length;
  return (
    <main className ="menu">
      <h2>Our Menu</h2>
      <>
      {/* concept of fragments used here , it doesn't all to create another node to dom  for more see notebook*/}
        <p>Authentic Itilian ,6 creative dishes to choose from. All from our stine oven , all delicious</p>
{numsPizza >0 ? (<ul className='pizzas'>{pizzaData.map ((pizza)=>(<Pizza pizzaObj={pizza} key ={pizza.name}/>))}</ul>) : (<p>we are still working on our menu, please come back later</p> )}
</>
</main>
  )
}

function Pizza ({pizzaObj}){
   return (
  <li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
    {/* //!here we did settings on classes and ids conditionally , shows soldout pizza based on css condition */}
    <div>
      <img src={pizzaObj.photoName} alt ={pizzaObj.name}/>
      <h3>{pizzaObj.name}</h3>
      <p>{pizzaObj.ingredients}</p>
      {/* <p>{pizzaObj.price}</p> */}
      <span>{pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price}</span>
    </div>
  </li>
   )
}

function Footer () {
  const hour = new Date().getHours();
  console.log(hour);
  const openHour = 9;
  const closedHour = 22;
  const isOpen = hour>=9 && hour <=22;
  return (
<footer className='footer'>
  {isOpen ? (
    <Order closedHour={closedHour}/>
  ): (<p>we are happy to welcome you between {openHour}:00 - {closedHour}:00</p>)}

</footer>
  )
}
function Order ({closedHour}) {

  return (
<footer>
  <div className='order'>
<p>we are open untill {closedHour} , come and visit us or order online</p>
<button className='btn'>Close</button>
  </div>
</footer>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root")); 
//! Container for React Application:

// The root DOM element (e.g., <div id="root"></div>) serves as a container where React will render the entire React application.
// React needs a specific starting point in the DOM to "inject" its virtual DOM and manage updates efficiently.
// Interaction Between React and the DOM:

// React works with a virtual DOM, but it ultimately needs a real DOM node as its anchor to render the initial application and apply updates.

//* if we put the whole parent element in strict mode then it actually render components 2 times , jus to verify the bugs//
// root.render(<App/>);
root.render(<StrictMode><App/></StrictMode>); 