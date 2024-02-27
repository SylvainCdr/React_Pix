import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
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
import { Provider } from "./Pages/appContext";

// on importe le hook useLocalStorage pour stocker l'utilisateur dans le local storage
import useLocalStorage from "use-local-storage";
function App() {

// on crée un state user et setUser pour stocker l'utilisateur en local storage
  const [user, setUser] = useLocalStorage("user", null);


  return (
    // <Provider> est un composant qui enveloppe toute l'application pour fournir un contexte partagé, ici l'utilisateur connecté
    <Provider value={{ user, setUser }}>

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
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/Catalogue/:category" element={<Products />} />
            <Route
              path="/Catalogue/:category/:subcategory"
              element={<Products />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
