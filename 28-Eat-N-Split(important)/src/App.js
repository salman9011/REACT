import "./index.css";
import { useState } from "react";
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showFriendForm, setShowFriendForm] = useState(false); // to the add friend form
  const [selectFriend, setSelectFriend] = useState(null); // on select button that friend will be added to split bill
    function handleAddFriend(newFriend){
      console.log(newFriend);
      setFriends((friends) => [...friends, newFriend]); // add new friend to the friends object
      setShowFriendForm(!showFriendForm); // after adding ui close the form
    
  } 
  //? lets add a function to select a friend when i click on select button for that we have to pass the friend object to the function
  function handleSelectFriend(friend){
    // setSelectFriend(friend); 
    // set the selected friend to the state
    setSelectFriend((curr) => curr?.id === friend?.id ? null : friend); // if the current friend is same as the selected friend then close the selected friend
    setShowFriendForm(false); // close the add friend form so both can't be open at the same time
  }
function handleToggleAddFreindForm(){
  if(!selectFriend) // if no friend is selected then only open the add friend form
    setShowFriendForm((prev) => !prev);
    // when we toggle the state inside the function react gives the previous state and we can toggle it
}
function handleSplitBill(value){
  console.log(value)
  setFriends((friends) => friends.map((friend) => friend.id === selectFriend.id ? {...friend, balance: friend.balance + value} : friend)
  // under the map function we are checking if the friend id is same as the selected friend id then we will update the balance of that friend
);
setSelectFriend(null); // close the split bill form after the bill is split
}


  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} onSelectFriend={handleSelectFriend} selectFriend={selectFriend} />

        {showFriendForm && <FormAddFriends onAddFriend={handleAddFriend}/>}

        <Button onClick={handleToggleAddFreindForm}>

          {showFriendForm ? "Close" : "Add Friend"}
        </Button>
      </div>
     {selectFriend && <FormSplitBill selectFriend ={selectFriend } onSplitBill={handleSplitBill}/>}
      {/* //! lets open this only when when friend is selected */}
    </div>
  );
}
function FriendsList({friends, onSelectFriend, selectFriend}) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id}  onSelectFriend={onSelectFriend} selectFriend={selectFriend}/>
      ))}
    </ul>
  );
}

function Friend({ friend, onSelectFriend, selectFriend  }) {
  // lets compare the select friend with current friend to add class because select and current friend can't be same every time
  const isSelected = selectFriend?.id === friend.id;
  return (
    <div>
      <li className={isSelected ? "selected" : ""}>
        <img src={friend.image} alt={friend.name} />
        {friend.name}
        {friend.balance < 0 && (
          <p className="red">
            you owe {friend.name} ${Math.abs(friend.balance)}
          </p>
        )}
        {friend.balance > 0 && (
          <p className="green">
            {friend.name} owes you ${Math.abs(friend.balance)}
          </p>
        )}
        {friend.balance === 0 && <p> you and {friend.name} are even</p>}
        <Button onClick={() => onSelectFriend(friend)}>{isSelected ? "Close" : "Select"}</Button>
      </li>
    </div>
  );
}
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
function FormAddFriends({onAddFriend}) {
  const [addFriend, setAddFriend] = useState("");
  const [addImage, setAddImage] = useState("https://i.pravatar.cc/48");
  const id =crypto.randomUUID();
  function handleSubmit(e) {
    e.preventDefault();
    if(!addFriend || !addImage) return;
    const newFriend = {
      name:addFriend,
      image:`${addImage}?u=${id}`, //? we want each image to be fixed 
      balance: 0,
      id
    };
    onAddFriend(newFriend); // send the new friend to the parent component to show on ui
    setAddFriend(""); // make form normal again
    setAddImage("https://i.pravatar.cc/48");
   
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👯Friend Name</label>
      <input
        type="text"
        value={addFriend}
        onChange={(e) => setAddFriend(e.target.value)}
      />
      <label>🏞️ image URL</label>
      <input
        type="text"
        value={addImage}
        onChange={(e) => setAddImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}
function FormSplitBill({selectFriend,onSplitBill }) {
  const [billValue, setBillValue] = useState("");
  const [yourExpense, setYourExpense] = useState("");
  const paidByFriend =  billValue ?  billValue - yourExpense : ""; // because the bill empty in start so we have to handle that// 
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  function handleSubmit(e){
    e.preventDefault();
    if(!billValue || !yourExpense) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -yourExpense);
    // here we are checking if the user is paying the bill then we will add the paid by friend value to the friend balance else we will subtract the your expense from the friend balances
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split bill with {selectFriend.name}</h2>
      <label>💰Bill value</label>
      <input type="text" value={billValue} onChange={e => setBillValue(Number(e.target.value))} />
      <label>🧍‍♂️Your Expenses</label>
      <input type="text" value={yourExpense} onChange={e => setYourExpense(Number(e.target.value) > billValue ? yourExpense : Number(e.target.value))} />
        {/* handle the negative number of expenses above */}
      <label>👯{selectFriend.name}'s expenses</label>
      <input type="text" disabled value ={paidByFriend} />
      <label>🤑Who is paying the bill</label>
      <select value={whoIsPaying} onChange={e => setWhoIsPaying(e.target.value)}>
        <option value="user">You</option>
        <option value="Friend">{selectFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}

