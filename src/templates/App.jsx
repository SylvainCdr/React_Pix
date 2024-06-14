import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import AboutUs from "./AboutUs/AboutUs";
import Expertise from "./Expertise/Expertise";
import Contact from "./Contact/Contact";
import Login from "./Authentification/Login/Login";
import Register from "./Authentification/Register/Register";
import ResetPassword from "./Authentification/ResetPassword/ResetPassword";
import AddProduct from "./Admin/AddProduct/AddProduct";
import Dashboard from "./Admin/Dashboard/Dashboard";
import AdminProducts from "./Admin/AdminProducts/AdminProducts";
import EditProduct from "./Admin/EditProduct/EditProduct";
import AdminUsers from "./Admin/AdminUsers/AdminUsers";
import Catalogue from "./Shop/Main/Main";
import Products from "./Shop/Products/Products";
import Product from "./Shop/Product/Product";
import EditUser from "./Admin/EditUser/EditUser";
import UserAccount from "./User/UserAccount/UserAccount";
import InfosUpdate from "./User/InfosUpdate/InfosUpdate";
import Cart from "./Shop/Cart/Cart";
import Order from "./Shop/Order/Order";
import OrderDetails from "./User/OrderDetails/OrderDetails";
import AdminOrders from "./Admin/AdminOrders/AdminOrders";
import EditOrders from "./Admin/EditOrders/EditOrders";
import AdminCarts from "./Admin/AdminCarts/AdminCarts";
import Rgpd from "./Authentification/Rgpd/Rgpd";
import Cgv from "./Authentification/Cgv/Cgv";
import Partners from "./Partners/Partners";
import EditUserCart from "./Admin/EditUserCart/EditUserCart";
import Template from "../Components/Template/Template";
import ScrollToTop from "../Components/scrollToTop";
import { Provider, CartProvider } from "./appContext";

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
          <ScrollToTop />
          <Routes>
            <Route element={<Template />}>
              {/* <Route path="/" element={<Home />} />
              <Route path="/notre-expertise" element={<Expertise />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/a-propos" element={<AboutUs />} />

              <Route path="/contact" element={<Contact />} />
              <Route path="/connexion" element={<Login />} />
              <Route path="/inscription" element={<Register />} />
              <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
              /> */}

              {/* Admin routes sécurisées */}
              {user && user.role === "admin" && (
                <>
                  <Route path="/admin/dashboard" element={<Dashboard />} />
                  <Route path="/admin/produits" element={<AdminProducts />} />
                  <Route
                    path="/admin/produits/ajout"
                    element={<AddProduct />}
                  />
                  <Route
                    path="/admin/produits/modification/:id"
                    element={<EditProduct />}
                  />
                  <Route path="/admin/utilisateurs" element={<AdminUsers />} />
                  <Route
                    path="/admin/utilisateurs/modification/:id"
                    element={<EditUser />}
                  />
                  <Route path="/admin/commandes" element={<AdminOrders />} />
                  <Route
                    path="/admin/commande/modification/:id"
                    element={<EditOrders />}
                  />
                  <Route path="/admin/paniers" element={<AdminCarts />} />
                  <Route
                    path="/admin/panier/modification/:id"
                    element={<EditUserCart />}
                  />
                </>
              )}
              {/* <Route path="/boutique" element={<Catalogue />} />
              <Route path="/boutique/:category" element={<Products />} />
              <Route
                path="/boutique/:category/:subcategory"
                element={<Products />}
              /> */}

              {/* <Route path="/boutique/produit/:id" element={<Product />} /> */}
              <Route path="/panier" element={<Cart />} />
              <Route path="/panier/commande" element={<Order />} />

              <Route path="/mon-compte" element={<UserAccount />} />
              <Route
                path="/mon-compte/commande/:id"
                element={<OrderDetails />}
              />
              <Route
                path="/mon-compte/modification"
                element={<InfosUpdate />}
              />

              {/* <Route path="/rgpd" element={<Rgpd />} />
              <Route path="/cgv" element={<Cgv />} />
              <Route path="/partenaires" element={<Partners />} /> */}
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </Provider>
  );
}

export default App;
