import React, { useContext, useState, useEffect } from "react";
import AppContext from "../Context/Context";
import axios from "../axios";
import CheckoutPopup from "./CheckoutPopup";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(AppContext);

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // FETCH IMAGES
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const updated = await Promise.all(
          cart.map(async (item) => {
            try {
              const res = await axios.get(
                `/product/${item.id}/image`,
                { responseType: "blob" }
              );
              const imageUrl = URL.createObjectURL(res.data);
              return { ...item, imageUrl };
            } catch {
              return {
                ...item,
                imageUrl: "https://via.placeholder.com/150",
              };
            }
          })
        );
        setCartItems(updated);
      } catch (err) {
        console.error("Error loading cart images:", err);
      }
    };

    if (cart.length) fetchImages();
    else setCartItems([]);
  }, [cart]);

  // CLEANUP MEMORY
  useEffect(() => {
    return () => {
      cartItems.forEach((item) => {
        if (item.imageUrl) URL.revokeObjectURL(item.imageUrl);
      });
    };
  }, [cartItems]);

  // TOTAL PRICE
  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [cartItems]);

  // QUANTITY HANDLING
  const handleIncrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? item.quantity < item.stockQuantity
            ? { ...item, quantity: item.quantity + 1 }
            : item
          : item
      )
    );
  };

  const handleDecrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    removeFromCart(id);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // CHECKOUT
  const handleCheckout = async () => {
    try {
      for (const item of cartItems) {
        const { imageUrl, quantity, ...rest } = item;

        const updatedProduct = {
          ...rest,
          stockQuantity: item.stockQuantity - item.quantity,
        };

        const formData = new FormData();
        formData.append(
          "product",
          new Blob([JSON.stringify(updatedProduct)], {
            type: "application/json",
          })
        );

        await axios.put(`/product/${item.id}`, formData);
      }

      clearCart();
      setCartItems([]);
      setShowModal(false);

      alert("Purchase successful!");
      window.location.reload();
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-white">
      <div className="max-w-[1100px] mx-auto px-6">
        
        {/* BREADCRUMBS */}
        <nav className="text-[11px] text-gray-400 mb-10 bg-[#f8f9fa] inline-block px-4 py-2 rounded-sm border border-gray-100">
          <Link to="/" className="hover:text-slate-900 transition">Home</Link>
          <span className="mx-2">›</span>
          <span className="text-slate-900 font-semibold">Your Shopping Cart</span>
        </nav>

        {/* TITLE */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight text-center mb-16">
          Your Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 border-t border-gray-200">
            <h4 className="text-2xl font-bold text-gray-400 mb-6">Your cart is empty</h4>
            <Link to="/" className="inline-block bg-[#38e5bd] hover:bg-[#2bc4a0] text-white px-8 py-3 text-xs font-bold tracking-widest uppercase transition shadow-sm">
              CONTINUE SHOPPING
            </Link>
          </div>
        ) : (
          <div>
            {/* TABLE HEADERS (Hidden on Mobile) */}
            <div className="hidden md:grid grid-cols-12 gap-6 border-b border-gray-200 pb-4 text-[13px] text-gray-500 font-medium tracking-wide">
              <div className="col-span-6">Product</div>
              <div className="col-span-2">Price</div>
              <div className="col-span-2">Quantity</div>
              <div className="col-span-2">Total</div>
            </div>

            {/* CART ITEMS */}
            <div className="mb-12">
              {cartItems.map((item) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b border-gray-100 py-6">
                  
                  {/* Product Details */}
                  <div className="col-span-1 md:col-span-6 flex gap-6 items-center">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-20 h-24 object-cover bg-[#f8f9fa] shadow-sm rounded-sm"
                    />
                    <div>
                      {item.brand && <p className="text-[11px] text-gray-500 uppercase tracking-widest mb-1">{item.brand}</p>}
                      <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-1 md:col-span-2 text-sm text-gray-600 font-medium">
                    ${item.price.toFixed(2)}
                  </div>

                  {/* Quantity Selector */}
                  <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center border border-gray-200 h-10 w-28 bg-white">
                      <button
                        type="button"
                        onClick={() => handleDecrease(item.id)}
                        className="w-8 flex items-center justify-center text-gray-400 hover:text-slate-900 transition"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={item.quantity}
                        readOnly
                        className="w-full text-center text-xs font-semibold outline-none bg-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => handleIncrease(item.id)}
                        className="w-8 flex items-center justify-center text-gray-400 hover:text-slate-900 transition"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Total & Remove */}
                  <div className="col-span-1 md:col-span-2 flex justify-between items-center text-sm font-bold text-slate-900">
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-gray-400 hover:text-[#ff4d4f] transition ml-4"
                      title="Remove item"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* BOTTOM SECTION */}
            <div className="flex flex-col lg:flex-row gap-12 justify-between">
              
              {/* Order Notes */}
              <div className="lg:w-[50%]">
                <label className="block text-sm text-gray-500 mb-3">Add a note to your order</label>
                <textarea
                  className="w-full border border-gray-200 p-4 text-sm text-slate-700 outline-none focus:border-slate-900 transition resize-none"
                  rows="4"
                  placeholder="How can we help you?"
                ></textarea>
                <div className="mt-6">
                  <Link to="/" className="text-[#38e5bd] text-xs font-bold tracking-widest uppercase hover:text-[#2bc4a0] transition">
                    CONTINUE SHOPPING
                  </Link>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:w-[40%] bg-[#e9ecef] p-8 rounded-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h3>
                
                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span>Total</span>
                  <span className="font-medium text-slate-800">{cartItems.length} item(s)</span>
                </div>

                <div className="flex justify-between text-base font-bold text-slate-900 mb-8">
                  <span>TOTAL PRICE</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>

                <button
                  onClick={() => setShowModal(true)}
                  className="w-full bg-[#38e5bd] hover:bg-[#2bc4a0] text-white py-3 text-xs font-bold tracking-widest uppercase transition shadow-sm"
                >
                  GO TO CHECKOUT
                </button>

                <p className="text-[10px] text-gray-500 text-center mt-6 leading-relaxed">
                  Zyra process all orders in USD. Shipping & taxes calculated at checkout.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <CheckoutPopup
        show={showModal}
        handleClose={() => setShowModal(false)}
        cartItems={cartItems}
        totalPrice={totalPrice}
        handleCheckout={handleCheckout}
      />
    </div>
  );
};

export default Cart;