import { BrowserRouter, Routes, Route } from "react-router-dom";
import Template from "./Components/Template/Template";

import Home from "./Pages/Home/Home";
import AboutUs from "./Pages/AboutUs/AboutUs";
import Expertise from "./Pages/Expertise/Expertise";
import Contact from "./Pages/Contact/Contact";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import AddProduct from "./Pages/Admin/AddProduct/AddProduct";
import Dashboard from "./Pages/Admin/Dashboard/Dashboard";
import AdminProducts from "./Pages/Admin/AdminProducts/AdminProducts";
import EditProduct from "./Pages/Admin/EditProduct/EditProduct";
import AdminUsers from "./Pages/Admin/AdminUsers/AdminUsers";
import Catalogue from "./Pages/Shop/Main/Main"; 
import Products from "./Pages/Shop/Products/Products";
import Product from "./Pages/Shop/Product/Product";



function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route element={<Template />}>
        <Route path="/" element={<Home />} />
        <Route path="/A-propos" element={<AboutUs />} />
        <Route path="/Notre-expertise" element={<Expertise />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/edit-product/:id" element={<EditProduct />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/catalogue" element={<Catalogue/>} />
        <Route path="/Catalogue/:category" element={<Products />} />
        <Route path="/Catalogue/:category/:subcategory" element={<Products />} />


        

        
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
