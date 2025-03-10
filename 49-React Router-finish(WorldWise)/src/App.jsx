import Homepage from "./pages/Homepage";
import Product from "./pages/product";
import Pricing from "./pages/Pricing";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import Logout from "./components/Logout";
import Login from "./pages/Login";
import { useState } from "react";
import { useEffect } from "react";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
const BASE_URL = "http://localhost:9000";
function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setCities(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);
  return (
    <BrowserRouter future={{ v7_relativeSplatPath: true }}>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route
            index
            element={ <Navigate   replace to="cities" />}
            //Navigate is used to redirect to the cities page when the app is loaded and replace is used to replace the current cities from the stack
          />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path="cities/:id" element={<City/>}/>
          <Route
            path="countries"
            element={<CountryList cities={cities} isLoading={isLoading} />}
          />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
