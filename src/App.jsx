import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Products from "./Pages/Products/Products";
import Product from "./Pages/Product/Product";
import Contact from "./Pages/Contact/Contact";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import AddProduct from "./Pages/AddProduct/AddProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/product/add" element={<AddProduct />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
