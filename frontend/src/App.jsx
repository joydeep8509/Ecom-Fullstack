import React, { useState } from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import AddProduct from "./components/AddProduct";
import Product from "./components/Product";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UpdateProduct from "./components/UpdateProduct";
import ProtectedRoute from "./utils/ProtectedRoute";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Cart from "./components/Cart";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <BrowserRouter>
      <Navbar onSelectCategory={handleCategorySelect} />

      <Routes>
        <Route path="/" element={<Home selectedCategory={selectedCategory} />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/product/:id" element={<Product />} />

        <Route
          path="/add_product"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/product/update/:id"
          element={
            <ProtectedRoute>
              <UpdateProduct />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;