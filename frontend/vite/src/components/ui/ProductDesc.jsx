import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCart } from "@/redux/productSlice";
import axios from "axios";
import { toast } from "sonner";
import { Input } from "./input";
import { Button } from "./button";
import { useNavigate } from "react-router-dom";

const ProductDesc = ({ product }) => {
  const [showPopup, setShowPopup] = useState(false);
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const navigate = useNavigate();

  // const addToCart = async (productId) => {
  //   console.log("Selected Color:", selectedColor); // ✅ ADD HERE

  //   if (!selectedColor) {
  //     toast.error("Please select a color");
  //     return;
  //   }
  //   try {
  //     const res = await axios.post(
  //       "http://localhost:3000/api/v1/cart/add",
  //       { productId, selectedColor: selectedColor },

  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       },
  //     );

  //     if (res.data.success) {
  //       toast.success("Product added to cart");
  //       setShowPopup(true);
  //       dispatch(setCart(res.data.cart));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const addToCart = async (productId) => {
  console.log("Color:", selectedColor);
  console.log("Size:", selectedSize);

  // ✅ FIX VALIDATION
  if (!selectedColor || !selectedSize) {
    toast.error("Please select color and size");
    return;
  }

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_URL}/api/v1/cart/add`,
      {
        productId,
        selectedColor,
        selectedSize, // ✅ ADD THIS
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (res.data.success) {
      toast.success("Product added to cart");
      setShowPopup(true);
      dispatch(setCart(res.data.cart));
    }
  } catch (error) {
    console.log(error);
  }
};
  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl text-center shadow-lg">
            <h2 className="text-xl font-bold mb-2">Success ✅</h2>
            <p>Product added successfully!</p>
            <Button
              className="mt-4 cursor-pointer"
              onClick={() => setShowPopup(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-4 w-full">
        <h1 className="font-bold text-lg sm:text-xl md:text-2xl text-gray-800">
          {product.productName}
        </h1>

        <p className="text-gray-800 text-sm sm:text-base">
          {product.category} | {product.brand}
        </p>

        <h2 className="text-black-500 font-bold text-xl sm:text-2xl">
          ₹{product.productPrice}
        </h2>

        <p className="line-clamp-4 sm:line-clamp-6 text-sm text-muted-foreground">
          {product.productDesc}
        </p>

        {/* ✅ ADD COLOR SELECTOR HERE */}
        <div className="mt-3">
          <p className="text-sm font-semibold mb-2">Select Color:</p>

          <div className="flex gap-2">
            {product.colors?.map((color, i) => (
              <button
                key={i}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full border-2 transition ${
                  selectedColor === color
                    ? "border-black scale-110"
                    : "border-gray-300"
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          {selectedColor && (
            <p className="text-sm mt-2">
              Selected:{" "}
              <span className="font-semibold capitalize">{selectedColor}</span>
            </p>
          )}
        </div>
                {/* 📏 SIZE SELECTOR */}
        <div className="mt-4">
          <p className="text-sm font-semibold mb-2">Select Size:</p>

          <div className="flex gap-2 flex-wrap">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1 border rounded-md text-sm transition ${
                  selectedSize === size
                    ? "bg-black text-white scale-105"
                    : "bg-white text-black border-gray-300"
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {selectedSize && (
            <p className="text-sm mt-2">
              Selected Size:{" "}
              <span className="font-semibold">{selectedSize}</span>
            </p>
          )}
        </div>

        <Button
          disabled={!selectedColor || !selectedSize}
          onClick={() => addToCart(product._id)}
          className="bg-yellow-600 w-full sm:w-max cursor-pointer hover:scale-105"
        >
          Add to Cart
        </Button>

      </div>
    </>
  );
};
export default ProductDesc;
