import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCustomer } from "./CustomerSlice";

function CreateCustomer() {
  const [fullName, setFullName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const  dispatch = useDispatch();

  function handleClick() {
    if(!fullName || !nationalId) return;
    dispatch(createCustomer(fullName, nationalId));
  }

  return (
    <div>
      <h2>Create new customer</h2>
      <div className="inputs">
        <div>
          <label>Customer full name</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label>National ID</label>
          <input
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
          />
        </div>
        <button onClick={handleClick}>Create new customer</button>
      </div>
    </div>
  );
}

export default CreateCustomer;


//1. lets create a customer for that we have action defined in slice , so to acees that action we need to import useDispatch hook from react-redux
//2. use dispatch returns a refernce to the dispatch function from the redux store it return dispatch function to us,
//3. here in react we call action creators like this 
//4. what action should we dispatch and what it will be , this is what our action creators come into play
