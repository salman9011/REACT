import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import { CitiesProvider } from "./context/CitiesProvider";
import { AuthProvider } from "./context/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import { Suspense } from "react";
import SpinnerFullPage from "./components/SpinnerFullPage";
const Homepage = React.lazy(() => import("./pages/Homepage"));
const Product = React.lazy(() => import("./pages/product"));
const CityList = React.lazy(() => import("./components/CityList"));
const CountryList = React.lazy(() => import("./components/CountryList"));
const City = React.lazy(() => import("./components/City"));
const Form = React.lazy(() => import("./components/Form"));
import Pricing from "./pages/Pricing";
import Logout from "./components/Logout";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";



function App() {
  return (
    <>
      {/* lets add auth provider to the component tree so that all the components can access the auth state */}
      <AuthProvider>
        {/* it doesn't matter where we put the cities provider , if we need Auth in cities then it must be parent of it */}
        <CitiesProvider>
          <BrowserRouter future={{ v7_relativeSplatPath: true }}>
            {/* //lets apply code splitting */}
            <Suspense fallback={<SpinnerFullPage />}>
              <Routes>
                <Route index element={<Homepage />} />
                <Route path="product" element={<Product />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="login" element={<Login />} />
                <Route
                  path="app"
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
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
            </Suspense>
          </BrowserRouter>
        </CitiesProvider>
      </AuthProvider>
    </>
  );
}

export default App;
