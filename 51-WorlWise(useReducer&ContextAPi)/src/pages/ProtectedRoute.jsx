import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../context/FakeAuthContext"

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!isAuthenticated) {
        navigate("/");
      }
    },
    [isAuthenticated, navigate]
  );
  return isAuthenticated ? children : null;
}
export default ProtectedRoute;

// this is used to protect the routes from unauthorized access, also when we use any link of of this app without authentication then it should load the home page
// so we wrap our routes with this component and if the user is not authenticated then it will redirect to the home page
// our whole app is in layout