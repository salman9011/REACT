import Homepage from "./pages/Homepage";
import Product from "./pages/product";
import Pricing from "./pages/Pricing";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import Logout from "./components/Logout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./context/CitiesProvider";
import { AuthProvider } from "./context/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <>
      {/* lets add auth provider to the component tree so that all the components can access the auth state */}
      <AuthProvider>
        {/* it doesn't matter where we put the cities provider , if we need Auth in cities then it must be parent of it */}
        <CitiesProvider>
          <BrowserRouter future={{ v7_relativeSplatPath: true }}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route path="app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
                <Route
                  index
                  element={<Navigate replace to="cities" />}
                  //Navigate is used to redirect to the cities page when the app is loaded and replace is used to replace the current cities from the stack
                />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="logout" element={<Logout />} />
            </Routes>
          </BrowserRouter>
        </CitiesProvider>
      </AuthProvider>
    </>
  );
}

export default App;
