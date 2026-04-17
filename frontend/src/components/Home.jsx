import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";
import AppContext from "../Context/Context";

const Home = ({ selectedCategory }) => {
  const { data, isError, refreshData } = useContext(AppContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const fetchImagesAndUpdateProducts = async () => {
        const updatedProducts = await Promise.all(
          data.map(async (product) => {
            try {
              const response = await axios.get(
                `http://localhost:8080/api/product/${product.id}/image`,
                { responseType: "blob" }
              );
              const imageUrl = URL.createObjectURL(response.data);
              return { ...product, imageUrl };
            } catch (error) {
              return { ...product, imageUrl: "https://via.placeholder.com/300" };
            }
          })
        );
        setProducts(updatedProducts);
      };
      fetchImagesAndUpdateProducts();
    }
  }, [data]);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  if (isError) {
    return (
      <h2 className="text-center py-40 text-red-500 font-semibold">
        Something went wrong...
      </h2>
    );
  }

  return (
    <div className="pt-16">

      {/* HERO SECTION */}
      <section className="bg-linear-to-r from-[#b2e0d1] to-[#f4ebff] pt-16 pb-28 px-6">
        <div className="max-w-300 mx-auto flex flex-col md:flex-row items-center justify-between">
          
          {/* Text Content */}
          <div className="md:w-1/2 space-y-4 z-10">
            <p className="uppercase tracking-[0.2em] text-xs font-bold text-gray-500">
              Spring / Summer 2026
            </p>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Women's Clothing
            </h1>
            <p className="text-gray-600 text-lg mt-2">
              Variety of clothes from everyday basics.
            </p>
            <button className="bg-[#38e5bd] hover:bg-[#2bc4a0] text-white font-bold px-8 py-3 rounded-full transition shadow-md mt-6 text-sm tracking-wide">
              SHOP NOW
            </button>
          </div>

          {/* Hero Image */}
          <div className="md:w-1/2 mt- md:mt-0 flex justify-end">
            <img 
              src="/Hero.png" 
              alt="Women's Clothing Hero" 
              className="w-full max-w-sm md:max-w-md lg:max-w-lg h-auto max-h-[500px] object-contain"
            />
          </div>
        </div>
      </section>

      {/* SUB HERO BANNERS */}
      <section className="max-w-300 mx-auto grid md:grid-cols-2 gap-8 px-6 -mt-16 relative z-20">
        
        {/* Banner 1 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex items-center justify-between hover:shadow-md transition">
          <div>
            <h3 className="text-2xl font-bold mb-5 text-slate-900 leading-snug">
              Up to 30% off<br />on all items.
            </h3>
            <button className="bg-[#38e5bd] text-white px-6 py-2 rounded-full font-bold text-xs tracking-wide hover:bg-[#2bc4a0] transition">
              SHOP NOW
            </button>
          </div>
          <img src="/Bag.png" alt="Promo Bag" className="w-70 object-contain" />
        </div>

        {/* Banner 2 */}
        <div className="bg-[#f0f4ff] rounded-xl shadow-sm border border-[#e0e7ff] p-8 flex items-center justify-between hover:shadow-md transition">
          <div>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">
              Spring / Summer
            </p>
            <h3 className="text-2xl font-bold mb-5 text-slate-900 leading-snug">
              New in this week
            </h3>
            <button className="bg-[#38e5bd] text-white px-6 py-2 rounded-full font-bold text-xs tracking-wide hover:bg-[#2bc4a0] transition">
              SHOP NOW
            </button>
          </div>
          <img src="Top.png" alt="Promo Top" className="w-40 object-contain" />
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="max-w-300 mx-auto mt-32 px-6 text-center">
        <h2 className="text-3xl font-bold text-slate-900">Best seller</h2>
        <p className="text-gray-500 mt-2 mb-12 text-sm">Top sale in this week</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-16">
          {filteredProducts.length === 0 ? (
            <h4 className="text-gray-400 col-span-full mt-10">
              No Products Available
            </h4>
          ) : (
            filteredProducts.slice(0, 12).map((product) => {
              const { id, name, price, imageUrl } = product;

              return (
                <div key={id} className="group text-center">
                  <div className="relative overflow-hidden mb-5 bg-[#f8f9fa] rounded">
                    
                    {/* BADGES */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                      <span className="bg-[#ff4d4f] text-white text-[10px] px-2 py-1 font-bold rounded-sm shadow-sm">
                        -22%
                      </span>
                      <span className="bg-slate-900 text-white text-[10px] px-2 py-1 font-bold rounded-sm shadow-sm">
                        Sale
                      </span>
                    </div>

                    <Link to={`/product/${id}`} className="block">
                      <img
                        src={imageUrl}
                        alt={name}
                        className="w-full aspect-3/4 object-cover mix-blend-darken group-hover:scale-105 transition duration-500 ease-in-out"
                      />
                    </Link>
                  </div>

                  <Link to={`/product/${id}`}>
                    <h6 className="font-semibold text-slate-800 text-sm mb-2 hover:text-[#38e5bd] transition">
                      {name}
                    </h6>
                    <div className="flex justify-center items-center gap-3">
                      <span className="text-[#ff4d4f] font-bold text-sm">
                        ${price.toFixed(2)}
                      </span>
                      <span className="text-gray-400 line-through text-sm font-medium">
                        ${(price * 1.22).toFixed(2)}
                      </span>
                    </div>
                  </Link>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[#fafafa] py-24 mt-32">
        <div className="max-w-300 mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900">Trusted by 15k users</h2>
          <p className="text-gray-500 text-xs font-bold tracking-widest uppercase mt-3 mb-16">
            15,000+ Reviews on Trustpilot
          </p>

          <div className="grid md:grid-cols-3 gap-12">
             <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="text-[#ffc107] text-xl mb-4 tracking-widest">
                  ★★★★★
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
                  "These guys do a killer job! Best customer support and extremely fast delivery. Highly recommend Zyra Theme."
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src="/Male.png"
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover shadow-sm"
                  />
                  <div>
                    <h6 className="font-bold text-sm text-slate-900">Lorem Ipsum</h6>
                    <p className="text-[11px] text-gray-500 uppercase tracking-wide">Customer</p>
                  </div>
                </div>
              </div>

               <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="text-[#ffc107] text-xl mb-4 tracking-widest">
                  ★★★★★
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
                  "These guys do a killer job! Best customer support and extremely fast delivery. Highly recommend Zyra Theme."
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src="/Male2.png"
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover shadow-sm"
                  />
                  <div>
                    <h6 className="font-bold text-sm text-slate-900">Lorem Ipsum</h6>
                    <p className="text-[11px] text-gray-500 uppercase tracking-wide">Customer</p>
                  </div>
                </div>
              </div>

               <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="text-[#ffc107] text-xl mb-4 tracking-widest">
                  ★★★★★
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
                  "These guys do a killer job! Best customer support and extremely fast delivery. Highly recommend Zyra Theme."
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src="/Female3.png"
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover shadow-sm"
                  />
                  <div>
                    <h6 className="font-bold text-sm text-slate-900">Lorem Ipsum</h6>
                    <p className="text-[11px] text-gray-500 uppercase tracking-wide">Customer</p>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section className="max-w-300 mx-auto px-6 text-center py-20 border-b border-gray-100">
        <h4 className="font-bold text-lg mb-8 text-left text-slate-800">
          Explore our brands
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center opacity-40 grayscale hover:grayscale-0 transition duration-500">
          <span className="text-2xl font-black tracking-tighter text-gray-800">BRAND</span>
          <span className="text-2xl font-serif italic text-gray-800">Brand</span>
          <span className="text-2xl font-light text-gray-800">Brand</span>
          <span className="text-2xl font-mono text-gray-800">Brand</span>
          <span className="text-2xl font-bold tracking-[0.3em] text-gray-800">TREND</span>
          <span className="text-2xl font-extrabold italic text-gray-800">GO/NO</span>
        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="bg-[#e0fcf6] py-5 mb-24">
        <div className="max-w-300 mx-auto px-6 flex flex-col md:flex-row justify-center items-center gap-6">
          <p className="font-bold text-slate-800 text-sm md:text-base">
            Interested in Zyra Shopping! Don't wait and buy now!
          </p>
          <button className="bg-[#38e5bd] text-white px-8 py-2 rounded-full font-bold text-xs tracking-wider shadow-sm hover:bg-[#2bc4a0] transition">
            BUY NOW
          </button>
        </div>
      </section>

      {/* FINAL PROMO SECTION */}
      <section className="max-w-500 mx-auto px-6 mb-32 flex flex-col md:flex-row items-center gap-30">
        <div className="md:w-1/2 w-full">
          <img
            src="/Shopify.png"
            alt="Shopify Upgrade"
            className="w-full object-contain rounded-xl"
          />
        </div>

        <div className="md:w-1/2 text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight text-slate-900 tracking-tight">
            <span className="text-[#6552e9]">Upgrade</span> your Shopify website with
            <span className="block mt-2 flex items-center gap-2">
              zyra
              <span className="bg-[#f0edff] text-[#6552e9] text-[10px] px-2 py-1 rounded-full uppercase tracking-widest font-bold align-middle">
                Envato
              </span>
            </span>
          </h1>

          <h2 className="text-2xl font-bold mb-4 text-slate-800">
            Revolutionary Multipurpose Shopify Theme!
          </h2>

          <p className="text-gray-600 mb-8 leading-relaxed text-sm">
            Variety of clothes | Stylish design | Unlimited options | OS 2.0 Functionality | Unlimited content
          </p>

          <button className="bg-[#6552e9] hover:bg-[#523fd0] text-white px-10 py-3 rounded-full font-bold shadow-md transition text-sm tracking-wide">
            VIEW NOW
          </button>
        </div>
      </section>

    </div>
  );
};

export default Home;