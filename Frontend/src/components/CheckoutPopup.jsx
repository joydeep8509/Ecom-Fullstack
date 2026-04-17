import React from "react";

const CheckoutPopup = ({
  show,
  handleClose,
  cartItems,
  totalPrice,
  handleCheckout,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">

      <div className="bg-white p-6 rounded w-full max-w-lg">

        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">Checkout</h2>
          <button onClick={handleClose}>✕</button>
        </div>

        <div className="max-h-[300px] overflow-y-auto space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-3">

              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-20 h-20 object-cover"
              />

              <div>
                <p className="font-bold">{item.name}</p>
                <p>Qty: {item.quantity}</p>
                <p>${item.price * item.quantity}</p>
              </div>
            </div>
          ))}

          <h3 className="text-center font-bold">
            Total: ${totalPrice.toFixed(2)}
          </h3>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={handleClose} className="border px-4 py-2">
            Cancel
          </button>

          <button
            onClick={handleCheckout}
            className="bg-[#38e5bd] text-white px-4 py-2"
          >
            Confirm
          </button>
        </div>

      </div>
    </div>
  );
};

export default CheckoutPopup;