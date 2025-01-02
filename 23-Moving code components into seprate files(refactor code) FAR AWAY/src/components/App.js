import { useState } from "react";
import "../index.css";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";
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






