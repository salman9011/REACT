import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import AppNav from "../components/AppNav";

function HomePage() {
  return (
    <div>
      <PageNav/>
      <h1>Welcome to the homepage!</h1>
      {/* <a href="/pricing"> pricing</a> this will reload the page lets use Link */}
      <AppNav/>
      <Link to="/app">App</Link>
    </div>
  );
}
export default HomePage;