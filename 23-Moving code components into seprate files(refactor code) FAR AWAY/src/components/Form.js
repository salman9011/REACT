import { useState } from "react";
export default function Form({ onHandleAddItems }) {
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