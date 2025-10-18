import { useState } from "react";
import Button from "../../ui/Button";

function CreateUserForm() {
  const [username, setUsername] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
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
