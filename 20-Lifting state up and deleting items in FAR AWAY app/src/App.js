import { useState } from "react";
import "./index.css";
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: true },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: true },
];

export default function App() {
  const [items, setItems] = useState([]);
  function handleAddItems(item) {
    setItems((items) => [...items, item]); // lets pass this function as prop to form component and call it
  }
  //lets delete the items from list
  function deleteItems(id){
    setItems(items => items.filter(item => item.id !==id))
    //the filter will filter out array based on the condition till it is true , if id matches with current id the item is removed
    // e.g we click on the socks having id 2 and that id is passed to delete func it will filter out items array till id matches and that will be filtered out means removed//

  }

  return (
    <div className="app">
      <Logo />
      <Form onHandleAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItem={deleteItems}/>
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}
function Form({ onHandleAddItems }) {
  // ?now taking control from dom and give it to react , using states and the whole control of form will be given to react
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  // const [items, setItems] = useState([]); //!lifting state up
  // function handleAddItems(item){
  // !setItems([...items,item]);// here we can't do this as current state is dependent on prev state , so use callback otherwise u might get older value as react set states into batches
  // ?setItems((items) => [...items, item]); //this is how we add items in immutable arrays
  // ?now we need to render these items on ui , but packingList is not child of form , it is sibling , and also form is not used to render them on ui,
  // ?so we need to Lift state Up to parent component
  // }
  function handleSubmit(e) {
    console.log(e);
    e.preventDefault();
    if (!description) return;
    const newItems = { description, quantity, packed: false, id: Date.now() };
    console.log(newItems);
    // now we need to render the newItems on ui
    onHandleAddItems(newItems);

    //?after submitting form the form should go back to its original state
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {/*created dynamic array here to display options then iterate over it to show them in select options */}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button>Add</button>
    </form>
  );
}
function PackingList({ items, onDeleteItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} onDeleteItem={onDeleteItem}/>
        ))}
      </ul>
    </div>
  );
}
function Item({ item,onDeleteItem }) {
  return (
    <li style={item.packed ? { textDecoration: "line-through" } : {}}>
      <span>
        {item?.quantity} {item?.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
function Stats() {
  return (
    <footer className="stats">
      <em>💼 You have x items in your list, and you already packed x items</em>
    </footer>
  );
}
