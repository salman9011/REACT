export default function Stats({ items }) {
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