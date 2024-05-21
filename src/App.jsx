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
import EditUser from "./Pages/Admin/EditUser/EditUser";
import UserAccount from "./Pages/Shop/UserAccount/UserAccount";
import Cart from "./Pages/Shop/Cart/Cart";
import Order from "./Pages/Shop/Order/Order"; 
import OrderDetails from "./Pages/Shop/OrderDetails/OrderDetails";
import AdminOrders from "./Pages/Admin/AdminOrders/AdminOrders";
import EditOrders from "./Pages/Admin/EditOrders/EditOrders";
import RGPD from "./Pages/RGPD/RGPD";
import CGV from "./Pages/CGV/CGV";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import { Provider, CartProvider } from "./Pages/appContext";

// on importe le hook useLocalStorage pour stocker l'utilisateur dans le local storage
import useLocalStorage from "use-local-storage";
function App() {

// on crée un state user et setUser pour stocker l'utilisateur en local storage
  const [user, setUser] = useLocalStorage("user", null);


  return (
    // <Provider> est un composant qui enveloppe toute l'application pour fournir un contexte partagé, ici l'utilisateur connecté
    <Provider value={{ user, setUser }}>
<CartProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Template />}>

          <Route path="/" element={<Home />} />
          <Route path="/a-propos" element={<AboutUs />} />
          <Route path="/notre-expertise" element={<Expertise />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/boutique/produit/:id" element={<Product />} />
          <Route path="/contact" element={<Contact />} />
          
          <Route path="/connexion" element={<Login />} />
          <Route path="/inscription" element={<Register />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/produits" element={<AdminProducts />} />
          <Route path="/admin/produits/ajout" element={<AddProduct />} />
          <Route path="/admin/produits/modification/:id" element={<EditProduct />} />
          <Route path="/admin/utilisateurs" element={<AdminUsers />} />
          <Route path="/admin/utilisateurs/modification/:id" element={<EditUser />} />
          <Route path="/admin/commandes" element={<AdminOrders />} />
          <Route path="/admin/commande/modification/:id" element={<EditOrders />} />

          <Route path="/boutique" element={<Catalogue />} />
          <Route path="/boutique/:category" element={<Products />} />
          <Route path="/boutique/:category/:subcategory" element={<Products />} />

          <Route path="/panier" element={<Cart />} />
          <Route path="/panier/commande" element={<Order />} />

          <Route path="/mon-compte" element={<UserAccount />} />
          <Route path="/mon-compte/commande/:id" element={<OrderDetails />} />

          <Route path="/rgpd" element={<RGPD />} />
          <Route path="/cgv" element={<CGV />} />

          </Route>
        </Routes>
      </BrowserRouter>

      </CartProvider>
    </Provider>
  );
}

export default App;
