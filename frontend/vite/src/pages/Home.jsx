import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Features from "@/components/Features";

const Home = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const slides = ["/s1.png", "/s2.png", "/s3.jpeg", "/s4.png"];
  const [current, setCurrent] = useState(0);

  // ✅ FETCH PRODUCTS
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/product/getallproducts"
        );
        setProducts(res.data.products || []);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  // 🔁 AUTO SLIDER
useEffect(() => {
  let lastScrollY = window.scrollY;

  const elements = document.querySelectorAll(".fade-up");

  const observer = new IntersectionObserver(
    (entries) => {
      const currentScrollY = window.scrollY;

      entries.forEach((entry) => {
        const el = entry.target;

        if (entry.isIntersecting) {
          // 🔥 detect scroll direction
          if (currentScrollY > lastScrollY) {
            // scrolling DOWN
            el.classList.remove("show-down");
            el.classList.add("show-up");
          } else {
            // scrolling UP
            el.classList.remove("show-up");
            el.classList.add("show-down");
          }
        }
      });

      lastScrollY = currentScrollY;
    },
    {
      threshold: 0.2,
    }
  );

  elements.forEach((el) => observer.observe(el));

  return () => observer.disconnect();
}, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // 🔥 SCROLL ANIMATION (FIXED)
useEffect(() => {
  let lastScrollY = window.scrollY;

  const elements = document.querySelectorAll(".fade-up");

  // 🔥 set initial hidden state
  elements.forEach((el) => el.classList.add("init"));

  const observer = new IntersectionObserver(
    (entries) => {
      const currentScrollY = window.scrollY;

      entries.forEach((entry) => {
        const el = entry.target;

        if (entry.isIntersecting) {
          // remove init when visible
          el.classList.remove("init");

          if (currentScrollY > lastScrollY) {
            // 🔽 scrolling DOWN
            el.classList.remove("show-down");
            el.classList.add("show-up");
          } else {
            // 🔼 scrolling UP
            el.classList.remove("show-up");
            el.classList.add("show-down");
          }
        } else {
          // 🔥 reset when fully out of view → so it can repeat
          el.classList.remove("show-up", "show-down");
          el.classList.add("init");
        }
      });

      lastScrollY = currentScrollY;
    },
    {
      threshold: 0.2,
    }
  );

  elements.forEach((el) => observer.observe(el));

  return () => observer.disconnect();
}, []);

  return (
    <div className="bg-gradient-to-b via-gray-100 to-yellow-100 p-10 min-h-screen pt-[110px]">
      
      {/* 🔥 SLIDER */}
      <div className="fade-up relative w-full max-w-7xl h-[220px] rounded-xl sm:h-[320px] md:h-[400px] lg:h-[500px] overflow-hidden">
        
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide}
              alt="banner"
              onClick={() => navigate("/products")}
              className="w-full h-full object-cover cursor-pointer flex-shrink-0"
            />
          ))}
        </div>

        {/* ARROWS */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* 🛍️ PRODUCTS */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8">
        
        {/* HEADER */}
        <div className="fade-up flex justify-between items-center mb-6">
          <h2 className="text-lg sm:text-2xl font-bold">
            Featured Products
          </h2>

          <button
            onClick={() => navigate("/products")}
            className="font-medium text-sm hover:underline"
          >
            View All →
          </button>
        </div>

        {/* PRODUCTS */}
        {products.length === 0 ? (
          <p>No products available</p>
        ) : 
        (
         <div
           className="
          fade-up grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-5"
         >
           {products.slice(0, 20).map((product) => (
             <div
               key={product._id}
               onClick={() => navigate(`/products/${product._id}`)}
               className="fade-up bg-white rounded-xl p-3 shadow hover:shadow-lg transition flex flex-col items-center cursor-pointer group"
             >
               {/* IMAGE */}
               <div className="overflow-hidden rounded-lg">
                 <img
                   src={product.productImg?.[0]?.url}
                   className="w-full h-32 sm:h-40 object-cover group-hover:scale-105 transition"
                   alt={product.productName}
                 />
               </div>

                <h3 className="text-xs sm:text-sm font-medium mt-2 line-clamp-2">
                  {product.productName}
                </h3>

                <p className="font-bold text-sm sm:text-base">
                  ₹{product.productPrice}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* FEATURES */}
        <div className="fade-up">
          <Features />
        </div>

        {/* 🔥 GALLERY */}
        <div className="mt-12">
          <h2 className="fade-up text-lg sm:text-2xl font-bold mb-6">
            Explore More
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-5">
            {[...Array(20)].map((_, index) => (
              <div
                key={index}
                className="fade-up overflow-hidden rounded-xl shadow hover:shadow-lg transition group"
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <img
                  src={`/gallery${index + 1}.jpg`}
                  alt="gallery"
                  className="w-full h-32 sm:h-40 object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;