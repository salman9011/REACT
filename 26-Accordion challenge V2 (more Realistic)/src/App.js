import { useState } from "react";
import "./index.css";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

export default function App() {
  return (
    <div>
      <Accordion data={faqs} />
    </div>
  );
}

function Accordion({ data }) {
  const [currOpen, setcurrOpen] = useState(null);
  return (
    <div className="accordion">
      {data.map((item, index) => (
        <AccordionItems
          currOpen={currOpen}
          setcurrOpen={setcurrOpen}
          number={index}
          title={item.title}
          text={item.text}
          key={item.title}
        />
      ))}
    </div>
  );
}

function AccordionItems({ number, title, text, currOpen, setcurrOpen }) {
  //const [isOpen, setisOpen] = useState(false);
  //the above state is specified to particular accordion and all accordion remains open
  // to acheive the particular accordionshould open and other remains close we need to lift state up
  //we have to open them based on number/ index
  // so we have to made isopen true/false based on specific index
  const isOpen = number === currOpen;

  function handleToggle() {
    if (isOpen) setcurrOpen(null);
    else setcurrOpen(number);
  }
  return (
    <div className={`item ${isOpen ? "open" : ""}`} onClick={handleToggle}>
      <p className="number">{number < 9 ? `0${number + 1}` : number + 1}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen && <div className="content-box">{text}</div>}
    </div>
  );
}
