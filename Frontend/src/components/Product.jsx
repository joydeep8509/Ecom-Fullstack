import { useNavigate, useParams, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppContext from "../Context/Context";
import axios from "../axios";

const Product = () => {
  const { id } = useParams();
  const { data, refreshData } = useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [qty, setQty] = useState(1);
  const [openAccordion, setOpenAccordion] = useState("information");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const { addToCart } = useContext(AppContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/product/${id}`);
        const prod = response.data;
        setProduct(prod);

        if (prod.imageUrl || prod.image_url) {
          setImageUrl(`http://localhost:8080${prod.imageUrl || prod.image_url}`);
        } else if (prod.imageName) {
          fetchImage();
        } else {
          setImageUrl("https://via.placeholder.com/600x800");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/product/${id}/image`,
          { responseType: "blob" }
        );
        setImageUrl(URL.createObjectURL(response.data));
      } catch (error) {
        setImageUrl("https://via.placeholder.com/600x800");
      }
    };

    fetchProduct();
  }, [id]);

  const deleteProduct = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/product/${id}`);
      alert("Product deleted successfully");
      refreshData();
      navigate("/");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditClick = () => navigate(`/product/update/${id}`);

  const toggleAccordion = (section) => {
    setOpenAccordion(openAccordion === section ? "" : section);
  };

  if (!product)
    return <h2 className="text-center py-40 text-slate-500 font-bold tracking-widest animate-pulse">LOADING...</h2>;

 const isAvailable = product.available || product.stockQuantity > 0;

  const relatedProducts = data
    ? data.filter((p) => p.id.toString() !== id).slice(0, 4)
    : [];

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-300 mx-auto px-6">

        {/* BREADCRUMB */}
        <nav className="text-[11px] uppercase tracking-widest text-gray-400 mb-10">
          <Link to="/" className="hover:text-slate-900 transition">Home</Link>
          <span className="mx-2">›</span>
          <Link to="/" className="hover:text-slate-900 transition">{product.category || "Accessories"}</Link>
          <span className="mx-2">›</span>
          <span className="text-slate-900 font-semibold">{product.name}</span>
        </nav>

        {/* MAIN PRODUCT LAYOUT */}
        <div className="flex flex-col lg:flex-row gap-12 mb-24">

          {/* LEFT: IMAGE GALLERY */}
          <div className="lg:w-[60%] flex gap-4 h-175">
            {/* Thumbnails */}
            <div className="hidden md:flex flex-col gap-3 w-20 overflow-y-auto no-scrollbar">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={`relative cursor-pointer border ${i === 1 ? "border-slate-900" : "border-transparent opacity-60 hover:opacity-100"} transition`}>
                  <img src={imageUrl} alt={`Thumb ${i}`} className="w-full aspect-3/4 object-cover bg-[#f8f9fa]" />
                  {i === 5 && (
                    <div className="absolute inset-0 bg-white/70 flex items-center justify-center text-xs font-bold text-slate-800">
                      +2 videos
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className="relative flex-1 bg-[#f8f9fa] flex items-center justify-center group overflow-hidden">
              <div className="absolute top-4 left-4 flex flex-col gap-1 z-10">
                <span className="bg-slate-900 text-white text-[10px] px-2 py-0.5 font-bold uppercase shadow-sm">New</span>
                <span className="bg-[#ff4d4f] text-white text-[10px] px-2 py-0.5 font-bold uppercase shadow-sm">Sale</span>
              </div>
              <button className="absolute top-4 right-4 text-gray-400 hover:text-slate-900 z-10">
                <i className="bi bi-arrows-fullscreen text-xl"></i>
              </button>
              <img src={imageUrl} alt={product.name} className="w-full h-full object-cover mix-blend-darken cursor-crosshair" />
            </div>
          </div>

          {/* RIGHT: PRODUCT DETAILS */}
          <div className="lg:w-[40%] text-slate-800">

            {/* Status & Reviews */}
            <div className="flex items-center gap-4 mb-4">
              <span className={`text-[10px] px-2 py-1 font-bold text-white tracking-widest uppercase ${isAvailable ? "bg-[#38e5bd]" : "bg-gray-400"}`}>
                {isAvailable ? "In Stock" : "Out of Stock"}
              </span>
              <div className="flex items-center gap-2 text-[11px] text-gray-400">
                <div className="text-gray-300">★★★★★</div>
                <span>0 reviews</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-extrabold mb-4 text-slate-900 tracking-tight">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <h2 className="text-2xl font-bold text-[#ff4d4f]">
                ${product.price.toFixed(2)}
              </h2>
              <span className="text-sm text-gray-400 line-through font-medium">
                ${(product.price * 1.3).toFixed(2)}
              </span>
              <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase border border-gray-200 px-2 py-1 rounded-sm ml-2">
                Save 30%
              </span>
            </div>

            {/* Size Selector */}
            <div className="mb-6">
              <p className="text-[11px] uppercase tracking-widest font-semibold text-gray-500 mb-3">Size: <span className="text-slate-900 ml-1">XXL</span></p>
              <div className="flex gap-2">
                {['XXL', 'XL', 'M', 'S', 'XS'].map(size => (
                  <button key={size} className={`w-10 h-10 border text-xs font-semibold flex items-center justify-center transition ${size === 'XXL' ? 'border-slate-900 text-slate-900' : 'border-gray-200 text-gray-400 hover:border-gray-400'}`}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              {product.desc || "Jeans can be the key to your look. The store offers a huge number of models, for every taste and style. Choose jeans in the online store with pleasure! Pay attention to these key..."}
            </p>

            {/* Viewing Status */}
            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-[#ff4d4f] animate-pulse"></span>
              7 people are viewing
            </div>

            {/* Qty & Actions */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 h-12 w-32">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 flex items-center justify-center text-gray-400 hover:text-slate-900 transition">-</button>
                  <input type="text" value={qty} readOnly className="w-full text-center text-sm font-semibold outline-none" />
                  <button onClick={() => setQty(q => q + 1)} className="w-10 flex items-center justify-center text-gray-400 hover:text-slate-900 transition">+</button>
                </div>
                <button className="h-12 w-12 border border-gray-200 flex items-center justify-center text-gray-400 hover:text-slate-900 hover:border-slate-900 transition">♡</button>
                <button className="h-12 w-12 border border-gray-200 flex items-center justify-center text-gray-400 hover:text-slate-900 hover:border-slate-900 transition">⚖</button>
              </div>

               {/* ADD TO CART */}
  <button
    onClick={() => addToCart({ ...product, quantity: qty })}
    disabled={!isAvailable}
    className="w-full bg-[#38e5bd] hover:bg-[#2bc4a0] text-white h-12 text-xs font-bold tracking-widest uppercase transition shadow-sm flex items-center justify-center"
  >
    ADD TO CART
  </button>

              <button disabled={!isAvailable} className="w-full bg-gray-200 hover:border-2 text-black h-12 text-xs font-bold tracking-widest uppercase transition shadow-sm flex items-center justify-center">
                BUY IT NOW
              </button>
            </div>

            {/* Meta Information */}
            <div className="space-y-2 text-[13px] text-gray-500 mb-6 pb-6 border-b border-gray-100">
              <p><span className="text-slate-800 font-semibold w-24 inline-block">SKU:</span> {product.id || "1476"}</p>
              <p><span className="text-slate-800 font-semibold w-24 inline-block">Vendor:</span> <span className="text-[#38e5bd] hover:underline cursor-pointer">{product.brand || "Zyra"}</span></p>
              <p><span className="text-slate-800 font-semibold w-24 inline-block">Product Type:</span> <span className="text-[#38e5bd] hover:underline cursor-pointer">{product.category || "Shirts"}</span></p>
              <p><span className="text-slate-800 font-semibold w-24 inline-block">Barcode:</span> —</p>
              <p><span className="text-slate-800 font-semibold w-24 inline-block">Tags:</span> Fashion, Shirts</p>
              <p><span className="text-slate-800 font-semibold w-24 inline-block">Collections:</span> Accessories, Sportswear, Underwear</p>
            </div>

            {/* Social Share & Sales */}
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span className="font-semibold text-slate-800">Share:</span>
              <span className="hover:text-slate-900 cursor-pointer">f</span>
              <span className="hover:text-slate-900 cursor-pointer">t</span>
              <span className="hover:text-slate-900 cursor-pointer">P</span>
            </div>
            <div className="flex items-center gap-2 text-[13px] text-gray-500 mb-8">
              <span className="text-[#ff4d4f]">🔥</span> 1 sold in recently
            </div>

            {/* Accordions */}
            <div className="border-t border-gray-200">
              {['DELIVERY INFORMATION', 'INFORMATION', 'PRODUCT DETAILS', 'REVIEWS (0)'].map((tab) => (
                <div key={tab} className="border-b border-gray-200">
                  <button onClick={() => toggleAccordion(tab)} className="w-full py-4 flex items-center justify-between text-xs font-bold tracking-widest uppercase text-slate-900 hover:text-[#38e5bd] transition">
                    {tab}
                    <span className="text-lg font-light">{openAccordion === tab ? '−' : '+'}</span>
                  </button>
                  {openAccordion === tab && (
                    <div className="pb-4 text-sm text-gray-500 leading-relaxed">
                      This is the detailed {tab.toLowerCase()} content that provides extensive details about the materials, shipping times, or user reviews.
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* ADMIN ACTIONS */}
            {token && (
              <div className="mt-10 p-5 rounded border border-[#ff4d4f] bg-red-50">
                <p className="text-[#ff4d4f] font-bold text-xs uppercase tracking-widest mb-4">Admin Controls</p>
                <div className="flex gap-3">
                  <button onClick={handleEditClick} className="flex-1 bg-white border border-[#ff4d4f] text-[#ff4d4f] text-xs font-bold py-2 uppercase tracking-wider hover:bg-[#ff4d4f] hover:text-white transition">
                    Edit
                  </button>
                  <button onClick={deleteProduct} className="flex-1 bg-[#ff4d4f] text-white text-xs font-bold py-2 uppercase tracking-wider hover:bg-red-600 transition">
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        <section className="mt-24 mb-32">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-12">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16">
            {relatedProducts.length > 0 ? (
              relatedProducts.map((relProd) => (
                <div key={relProd.id} className="group text-center">
                  <div className="relative overflow-hidden mb-5 bg-[#f8f9fa] rounded">
                    <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                      <span className="bg-[#ff4d4f] text-white text-[10px] px-2 py-0.5 font-bold uppercase shadow-sm">-20%</span>
                      <span className="bg-slate-900 text-white text-[10px] px-2 py-0.5 font-bold uppercase shadow-sm">Sale</span>
                    </div>
                    <Link to={`/product/${relProd.id}`} className="block">
                      <img src={`http://localhost:8080/api/product/${relProd.id}/image`} alt={relProd.name} className="w-full aspect-[3/4] object-cover mix-blend-darken group-hover:scale-105 transition duration-500 ease-in-out" />
                    </Link>
                  </div>
                  <Link to={`/product/${relProd.id}`}>
                    <h6 className="font-semibold text-slate-800 text-sm mb-2 hover:text-[#38e5bd] transition">{relProd.name}</h6>
                    <div className="flex justify-center items-center gap-3">
                      <span className="text-[#ff4d4f] font-bold text-sm">${relProd.price.toFixed(2)}</span>
                      <span className="text-gray-400 line-through text-sm font-medium">${(relProd.price * 1.2).toFixed(2)}</span>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-gray-400 col-span-full text-center">No related products found.</p>
            )}
          </div>
        </section>

        {/* PROMO BANNER */}
        <section className="mb-20 flex flex-col md:flex-row items-center gap-16 border-t border-gray-100 pt-20">
          <div className="md:w-1/2 w-full">
            <img src="https://via.placeholder.com/600x400" alt="Shopify Upgrade" className="w-full object-cover rounded shadow-sm" />
          </div>
          <div className="md:w-1/2 text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight text-slate-900 tracking-tight">
              <span className="text-[#ff4d4f]">Upgrade</span> your Shopify website with
              <span className="block mt-2 flex items-center gap-2">zyra<span className="bg-[#f0edff] text-[#6552e9] text-[10px] px-2 py-1 rounded-full uppercase tracking-widest font-bold align-middle">Envato</span></span>
            </h1>
            <h2 className="text-xl font-bold mb-4 text-slate-800">Revolutionary Multipurpose Shopify Theme!</h2>
            <p className="text-gray-500 mb-8 leading-relaxed text-sm">Variety of clothes | Stylish design | Unparalleled OS 2.0 Functionality | Unlimited options</p>
            <button className="bg-[#6552e9] hover:bg-[#523fd0] text-white px-10 py-3 rounded-full font-bold shadow-md transition text-xs tracking-widest uppercase">VIEW NOW</button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Product;