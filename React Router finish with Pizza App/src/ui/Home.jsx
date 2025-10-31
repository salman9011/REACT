import { useSelector } from "react-redux";
import CreateUserForm from "../features/user/CreateUserForm";
import Button from "./Button";


function Home() {
  const username = useSelector((state)=> state.user.username);
  return (
    <div className="my-10 text-center md:text-3xl sm:my-16 px-4">
      <h1 className=" mb-8  text-xl font-semibold ">
        The best pizza.
        <br />
        <span className="text-yellow-500"> 
        Straight out of the oven, straight to you.
        </span>
      </h1>
      {username ===''?<CreateUserForm /> :<Button to="/menu" type="primary">Start ordering, {username}</Button>}
    </div>
  );
}

export default Home;
