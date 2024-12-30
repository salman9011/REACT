import { useState } from "react";
import "./index.css";
export default function App() {
  const [items, setItems] = useState([]);
  function handleAddItems(item) {
    setItems((items) => [...items, item]); // lets pass this function as prop to form component and call it
  }
  //lets delete the items from list
  function deleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
    //the filter will filter out array based on the condition till it is true , if id matches with current id the item is removed
    // e.g we click on the socks having id 2 and that id is passed to delete func it will filter out items array till id matches and that will be filtered out means removed//
  }
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList (){
    const confirmed= window.confirm("Are you sure you want to delete all items")
    if(confirmed) setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onHandleAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={deleteItems}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
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
function PackingList({ items, onDeleteItem, onToggleItem, onClearList }) {
  const [sortBy , setsortBy] = useState("input") // to track the options , which option is selected
  //lets store items in new variable because sort mutates the original array . so use derived state
  let sortedItems;
  if(sortBy === "input")  sortedItems = items;
  if(sortBy === 'description') sortedItems = items.slice().sort((a,b) => a.description.localeCompare(b.description))
    // slice will create copy of array otherwise the sort will mutate the original array

  if(sortBy === 'packed') sortedItems = items.slice().sort((a,b) => Number(a.packed)-Number(b.packed))

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))} 
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setsortBy(e.target.value)}>
          <option value="input">sort by input</option>
          <option value="description">sort by description</option>
          <option value="packed">sort by packing list</option>
        </select>
        <button onClick={onClearList}>Clear</button>
      </div>
    </div>
  );
}
function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => {
          onToggleItem(item.id);
        }}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item?.quantity} {item?.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );
    //?These are called derived states 
  const totalItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const totalPercent = Math.round((packedItems / totalItems) * 100);
  return (
    <footer className="stats">
      <em>
        {totalPercent === 100
          ? "your are ready to go ✈️"
          : `💼 You have ${totalItems} items in your list, and you already packed ${packedItems} items , so your ${totalPercent}% packing is done`}
      </em>
    </footer>
  );
}
