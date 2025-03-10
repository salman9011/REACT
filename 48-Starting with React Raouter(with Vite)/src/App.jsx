import Homepage from "./pages/Homepage";
import Product from "./pages/product";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
function App() {
  return (
    //1 <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Homepage />} />
    //     <Route path="product" element={<Product />} />
    //     <Route path="pricing" element={<Pricing />} />
    //     <Route path="*" element={<PageNotFound />} />
    //   </Routes>
    // </BrowserRouter>
    // ? 2 this how we create routes and now lets link between them to turnout spa Application and if we use <a> </a> it will reload the page//
    //? like this <a href="/product">Product</a> it will reload the page and we don't want that so we use <Link to="/product">Product</Link> instead
    //? and we need to import Link from react-router-dom
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="product" element={<Product/>} />
      <Route path="pricing" element={<Pricing />} />
      <Route path="app" element={<AppLayout />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
