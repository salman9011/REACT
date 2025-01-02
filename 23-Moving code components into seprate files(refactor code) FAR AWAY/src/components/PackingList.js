import { useState } from "react";
import Item from "./Item"
export default function PackingList({ items, onDeleteItem, onToggleItem, onClearList }) {
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