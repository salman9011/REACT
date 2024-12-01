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
  //lets render our menu based on condition//
  const numPizzas = pizzaData.length;

  return (
    <main className='menu'>
    <h2>Our Menu</h2>
    <div>
      {/* {pizzaData.map(pizzaItem=><Pizza name={pizzaItem.name} photoName={pizzaItem.photoName} ingredients={pizzaItem.ingredients} price={pizzaItem.price}/>)} */}
      {/* this is not specific way of passing the list , so we pass it more specific way  like whole object */}
    {/* {numPizzas>0 && (<ul className="pizzas"> */}
      {/* because if pizzaData got empty array  then it will be 0 means empty array as it is truthy value and ul list be still render as 0 is falsy value , that is why we check numPizza >0s  */}
     {/* {pizzaData.map((pizza)=>(<Pizza pizzaObj ={pizza} key={pizza.name}/>))} */}
     {/* </ul> */}
    {/* )} */}
    {/* </div> */}

    {/* //! with ternerty rendering we can make it more specific */}
    {numPizzas > 0 ? (<ul className='pizzas'>
      {pizzaData.map((pizza)=>(<Pizza pizzaObj ={pizza} key={pizza.name}/>))}
    </ul>) : (<p>we are still working on our menu, please come back later</p>)}
    </div>
   {/* <Pizza 
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
    /> */}
    </main>
  )
}
function Footer () {
  // as components are js function we can also declare the variables inside them//
  const hour = new Date().getHours();
  const openHour = 9 ;
  const closedHour = 22;
  // console.log(hour);
 const isOpen = hour>=9 && hour <=closedHour;
  return (
    // <footer className='footer'>{isOpen && <p>open</p>}</footer>
    //thr second part of operator is returned only when first part is true , this concept of short circuiting//
    //another key point is react doesn't render true/false into dom , if we try to write it into jsx also, it will only check//
    <footer className='footer'>
      {isOpen && (
        <div className='order'>
        <p>we are open untill {closedHour}:00, come and visit us or order online</p>
      <button className='btn'>order</button>
      </div>
      //this is good use case of rendering//
  )}
    </footer>
      
  )
}




function Pizza (props){
  return (
    <li className="pizza">
    <div>
      {/* lets recive same list and extract data */}
    <img src={props?.pizzaObj.photoName} alt ={props?.pizzaObj.name}/>
  <h3>{props?.pizzaObj.name}</h3>
  <p>{props?.pizzaObj.ingredients}</p>
  <p>Rs: {props?.pizzaObj.price}</p>
  </div>
  </li>
  // this is how we render a list and pass that whole object as prop
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