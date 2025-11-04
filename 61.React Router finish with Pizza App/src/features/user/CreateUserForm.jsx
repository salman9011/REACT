import { useState } from "react";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { updateUser } from "./userSlice";
import { useNavigate } from "react-router-dom";


function CreateUserForm() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // now lets dispatch the action to but we can't dispatch is directly we have to use local state , dispatching onChnage will be too much re rendering so we will dispatch it on form submit //


  function handleSubmit(e) {
    e.preventDefault();
      if(!username) return ;
   dispatch(updateUser(username))
   navigate("/menu")
  }
  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>
      <input
      
        type="text"
        placeholder="enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-72 input mb-8"
      />
      {username !== "" && (
        <div>
          <Button type="primary">start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUserForm;
