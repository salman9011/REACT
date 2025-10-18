import CreateUserForm from "../features/user/CreateUserForm";


function Home() {
  return (
    <div className="my-10 text-center md:text-3xl sm:my-16 px-4">
      <h1 className=" mb-8  text-xl font-semibold ">
        The best pizza.
        <br />
        <span className="text-yellow-500"> 
        Straight out of the oven, straight to you.
        </span>
      </h1>
      <CreateUserForm />
    </div>
  );
}

export default Home;
