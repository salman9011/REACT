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



function App () {
  return(
  <div className='container'>
    {/* <h1>Hello React!!!</h1> */}
    {/* {alert ("Hi i'm using React")} */}
    <Header/>
    <Menu/>
    <Footer/> 
    {/*  this is how we do nesting in react */}
  </div> 
  )
}

function Header () {
  // const style ={color:'red',fontSize:'50px', textTransform:'uppercase'}
  return (
    // <h1 style ={{color:'red',fontSize:'50px', textTransform:'uppercase'}}>Fast React Pizza co.</h1> // so we can use inline style like this//
    // <h1 style ={style}>Fast React Pizza co.</h1>  // we can also do it like a prop//
    <header className="header"> 
    {/* getting styles from external css  as classnames*/}
      <h1 >Fast React Pizza co.</h1> 
    </header>
  )
}
function Menu () {
  return (
    <main className='menu'>
    <h2>Our Menu</h2>
    <Pizza 
    name= "Focaccia"
    ingredients= "Bread with italian olive oil and rosemary"
    price="6"
    photoName= "pizzas/focaccia.jpg"
    />
    <Pizza
     name= "Pizza Margherita"
     ingredients= "Tomato and mozarella"
     price= "10"
     photoName= "pizzas/margherita.jpg"
    />
    <Pizza 
    name ="Pizza Spinaci"
    ingredients= "Tomato, mozarella, spinach, and ricotta cheese"
    price= "12"
    photoName= "pizzas/spinaci.jpg"
    />
    <Pizza
    name= "Pizza Funghi"
    ingredients= "Tomato, mozarella, mushrooms, and onion"
    price= "12"
    photoName= "pizzas/funghi.jpg"
    />
    <Pizza
    name ="Pizza Prosciutto"
    ingredients ="Tomato, mozarella, ham, aragula, and burrata cheese"
    price= {18}
    // if we want to use jus number below in child comp, then send it as numb
    photoName ="pizzas/prosciutto.jpg"
    />
    </main>
  )
}
function Footer () {
  // as components are js function we can also declare the variables inside them//
  // const hour = new Date().getHours();
  // const openHour = 9 ;
  // const closedHour = 22;
  // console.log(hour);
  // if (hour >= openHour && hour <= closedHour){
  //     alert ("we are open");
  // }
  //      else alert("we are closed");
  return (
    <footer className='footer'>{new Date().toLocaleTimeString()} we are currently open⌚</footer>
    
  )
}




function Pizza (props){
  return (
    <div>
    <img src={props?.photoName} alt ={props?.name}/>
  <h3>{props?.name}</h3>
  <p>{props?.ingredients}</p>
  <p>{props?.price+3}</p>
  </div>
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