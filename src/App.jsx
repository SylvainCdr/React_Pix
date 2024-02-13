import { BrowserRouter, Routes, Route } from "react-router-dom";
import Template from "./Components/Template/Template";

import Home from "./Pages/Home/Home";
import Products from "./Pages/Products/Products";
import AboutUs from "./Pages/AboutUs/AboutUs";
import Expertise from "./Pages/Expertise/Expertise";
import Product from "./Pages/Product/Product";
import Contact from "./Pages/Contact/Contact";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import AddProduct from "./Pages/Admin/AddProduct/AddProduct";
import Dashboard from "./Pages/Admin/Dashboard/Dashboard";
import AdminProducts from "./Pages/Admin/AdminProducts/AdminProducts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route element={<Template />}>
        <Route path="/" element={<Home />} />
        <Route path="/produits" element={<Products />} />
        <Route path="/A-propos" element={<AboutUs />} />
        <Route path="/Notre-expertise" element={<Expertise />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
