import React, {useState, useEffect} from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import { Routes, Route } from "react-router-dom";
import Detail from "./Detail";
import Cart from "./Cart";


export default function App() {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) ?? [];
    } catch {
      console.error("The cart could not be parsed into JSON.");
      return [];
    }
  });

  useEffect(() => localStorage.setItem('cart', JSON.stringify(cart)), [cart]);

  function addToCart(id, sku) {
    setCart((items) => {
      console.log('items', items);
      const itemInCart = items.find((i) => i.sku === sku);
      console.log('id, sku, quantity', id, sku);
      if (itemInCart) {
        // Return new array with the matching item replaced
        return items.map((i) => i.sku === sku ? { ...i , quantity: i.quantity + 1} : i) // if i.sku === sku increase the quantity by one else return the item
      } else {
        // Return new array with the new item appended
        console.log('new item', items);
        console.log('update items', [...items, { id, sku, quantity: 1 }]   )
        return [...items, { id, sku, quantity: 1}]  // equivalent to { id: id, sku: sku, quantity: 1}
      }

    })

  }

  function updateQuantity(sku, quantity) {
    setCart((items) => {
      if (quantity === 0) {
        return items.filter((i) => i.sku !== sku);
      }
      return items.map((i) => i.sku === sku ? { ...i, quantity } : i) // if i.sku === sku i equals quantity else return i
    })
  }


  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to Carved Rock Fitness</h1>} />
            <Route path="/:category" element={<Products />} />
            <Route path="/:category/:id" element={<Detail addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
