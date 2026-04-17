import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";

const UpdateProduct = () => {
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [updateProduct, setUpdateProduct] = useState({
    name: "",
    desc: "",
    brand: "",
    price: "",
    category: "",
    releaseDate: "",
    available: false,
    stockQuantity: "",
  });

  // FETCH PRODUCT
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/product/${id}`
        );

        setProduct(res.data);
        setUpdateProduct(res.data);

        setPreview(`http://localhost:8080/api/product/${id}/image`);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    fetchProduct();
  }, [id]);

  // INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateProduct({
      ...updateProduct,
      [name]: value,
    });
  };

  // IMAGE CHANGE
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (image) {
      formData.append("imageFile", image);
    }

    formData.append(
      "product",
      new Blob([JSON.stringify(updateProduct)], {
        type: "application/json",
      })
    );

    try {
      await axios.put(
        `http://localhost:8080/api/product/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Product updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update product");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24">
      <h1 className="text-2xl font-bold mb-6">Update Product</h1>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>

        {/* NAME */}
        <div>
          <h6 className="font-semibold mb-1">Name</h6>
          <input
            type="text"
            name="name"
            value={updateProduct.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* BRAND */}
        <div>
          <h6 className="font-semibold mb-1">Brand</h6>
          <input
            type="text"
            name="brand"
            value={updateProduct.brand}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* DESCRIPTION */}
        <div className="md:col-span-2">
          <h6 className="font-semibold mb-1">Description</h6>
          <input
            type="text"
            name="desc"
            value={updateProduct.desc}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* PRICE */}
        <div>
          <h6 className="font-semibold mb-1">Price</h6>
          <input
            type="number"
            name="price"
            value={updateProduct.price}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* CATEGORY */}
        <div>
          <h6 className="font-semibold mb-1">Category</h6>
          <select
            name="category"
            value={updateProduct.category}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select</option>
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
          <h6 className="font-semibold mb-1">Stock</h6>
          <input
            type="number"
            name="stockQuantity"
            value={updateProduct.stockQuantity}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* IMAGE */}
        <div className="md:col-span-2">
          <h6 className="font-semibold mb-1">Image</h6>

          <img
            src={preview}
            alt="preview"
            className="w-full h-45 object-cover mb-2"
          />

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
            checked={updateProduct.available}
            onChange={(e) =>
              setUpdateProduct({
                ...updateProduct,
                available: e.target.checked,
              })
            }
          />
          <label>Available</label>
        </div>

        {/* SUBMIT */}
        <div className="md:col-span-2">
          <button className="w-full bg-[#38e5bd] text-white py-2 font-bold">
            Update
          </button>
        </div>

      </form>
    </div>
  );
};

export default UpdateProduct;