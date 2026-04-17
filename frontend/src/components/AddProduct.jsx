import React, { useState } from "react";
import axios from "../axios";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    desc: "",
    price: "",
    category: "",
    stockQuantity: "",
    releaseDate: "",
    available: false,
  });

  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("imageFile", image);
    formData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );

    axios
      .post("http://localhost:8080/api/product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log("Product added successfully:", response.data);
        alert("Product added successfully");
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        alert("Error adding product");
      });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24">
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={submitHandler}>

        {/* NAME */}
        <div>
          <h6 className="font-semibold mb-1">Name</h6>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* BRAND */}
        <div>
          <h6 className="font-semibold mb-1">Brand</h6>
          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleInputChange}
            placeholder="Enter your Brand"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* DESCRIPTION */}
        <div className="md:col-span-2">
          <h6 className="font-semibold mb-1">Description</h6>
          <input
            type="text"
            name="desc"
            value={product.desc}
            onChange={handleInputChange}
            placeholder="Add product description"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* PRICE */}
        <div>
          <h6 className="font-semibold mb-1">Price</h6>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            placeholder="Eg: $1000"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* CATEGORY */}
        <div>
          <h6 className="font-semibold mb-1">Category</h6>
          <select
            name="category"
            value={product.category}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select category</option>
            <option value="Laptop">Laptop</option>
            <option value="Headphone">Headphone</option>
            <option value="Mobile">Mobile</option>
            <option value="Electronics">Electronics</option>
            <option value="Toys">Toys</option>
            <option value="Fashion">Fashion</option>
          </select>
        </div>

        {/* STOCK */}
        <div>
          <h6 className="font-semibold mb-1">Stock Quantity</h6>
          <input
            type="number"
            name="stockQuantity"
            value={product.stockQuantity}
            onChange={handleInputChange}
            placeholder="Stock Remaining"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* RELEASE DATE */}
        <div>
          <h6 className="font-semibold mb-1">Release Date</h6>
          <input
            type="date"
            name="releaseDate"
            value={product.releaseDate}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* IMAGE */}
        <div className="md:col-span-2">
          <h6 className="font-semibold mb-1">Image</h6>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* AVAILABLE */}
        <div className="md:col-span-2 flex items-center gap-2">
          <input
            type="checkbox"
            checked={product.available}
            onChange={(e) =>
              setProduct({ ...product, available: e.target.checked })
            }
          />
          <label>Product Available</label>
        </div>

        {/* SUBMIT */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-[#38e5bd] text-white py-2 font-bold"
          >
            Submit
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddProduct;