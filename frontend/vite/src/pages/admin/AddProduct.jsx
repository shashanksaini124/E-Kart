import {
  Card,
  CardContent,
  CardFooter,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/ui/ImageUpload";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { Loader2 } from "lucide-react";

const AddProduct = () => {
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // 👈 popup state

  const [productData, setProductData] = useState({
    productName: "",
    productPrice: 0,
    productDesc: "",
    productImg: [],
    brand: "",
    category: "",
    colors: ["black", "blue", "red", "white"],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (productData.productImg.length === 0) {
      toast.error("Please select at least one image");
      return;
    }

    const formData = new FormData();

    Object.entries(productData).forEach(([key, value]) => {
      if (key !== "productImg") {
        if (key === "colors") {
          formData.append("colors", JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      }
    });

    productData.productImg.forEach((img) => {
      formData.append("files", img);
    });

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:3000/api/v1/product/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      toast.success("Product added successfully");

      // 👇 SHOW POPUP AFTER SUCCESS
      setShowPopup(true);
    } catch (error) {
      console.log("ERROR:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 🔥 POPUP */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl text-center shadow-lg">
            <h2 className="text-xl font-bold mb-2">Success ✅</h2>
            <p>Product added successfully!</p>
            <Button
              className="mt-4"
              onClick={() => setShowPopup(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}

      <div className="min-h-screen 
      bg-gradient-to-tr from-pink-200 via-yellow-100 to-purple-200 
      px-3 sm:px-6 lg:px-8 
      py-20 md:py-20 
      md:ml-[220px] lg:ml-[300px]"
      >
        <Card className="w-full max-w-3xl mx-auto my-6 sm:my-10">

          <CardHeader>
            <CardTitle>Add Product</CardTitle>
            <CardDescription>Enter Product details</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-4">

              <Input name="productName" placeholder="Product Name" onChange={handleChange} />
              <Input name="productPrice" type="number" placeholder="Price" onChange={handleChange} />
              <Input name="brand" placeholder="Brand" onChange={handleChange} />
              <Input name="category" placeholder="Category" onChange={handleChange} />

              <textarea
                name="productDesc"
                placeholder="Description"
                onChange={handleChange}
                className="border p-2 rounded"
              />

              <ImageUpload
                productData={productData}
                setProductData={setProductData}
              />

              {/* 🎨 COLOR PICKER */}
              <div>
                <Label>Select Colors</Label>

                <div className="flex gap-3 mt-2 flex-wrap">
                  {["red","blue","black","green","yellow","purple","white"].map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => {
                        setProductData((prev) => {
                          const exists = prev.colors.includes(color);
                          return {
                            ...prev,
                            colors: exists
                              ? prev.colors.filter((c) => c !== color)
                              : [...prev.colors, color],
                          };
                        });
                      }}
                      className={`w-8 h-8 rounded-full border-2 transition ${
                        productData.colors.includes(color)
                          ? "border-black scale-110 shadow-lg"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                <p className="mt-2 text-sm">
                  Selected: <b>{productData.colors.join(", ")}</b>
                </p>
              </div>

            </div>
          </CardContent>

          <CardFooter>
            <Button onClick={submitHandler} className="w-full bg-pink-600 cursor-pointer text-white">
              {loading ? <Loader2 className="animate-spin" /> : "Add Product"}
            </Button>
          </CardFooter>

        </Card>
      </div>
    </>
  );
};

export default AddProduct;