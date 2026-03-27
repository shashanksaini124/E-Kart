import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";
 
const Lo = () => {
  const [showpassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/api/v1/user/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log("FULL RESPONSE:", response.data);
      console.log("TOKEN FROM BACKEND:", response.data.accessToken);

      if (response.data.success) {
        const token = response.data.accessToken;

        if (!token) {
          console.log("❌ Token missing in response!");
          toast.error("Login failed: token missing");
          return;
        }
        localStorage.setItem("accessToken", token);
        console.log(
          "TOKEN SAVED IN LOCALSTORAGE:",
          localStorage.getItem("accessToken"),
        );
        dispatch(setUser(response.data.user));
        navigate("/");
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto bg-gradient-to-b from-white via-gray-100 to-yellow-100 rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left Section */}
          <div className="w-full md:w-1/2 p-8 md:p-12">
            {/* Brand Name */}
            <div className="mb-10">
              <h1 className="inline-block px-6 py-3 rounded-full border-2 border-gray-800 font-bold text-xl">
                H A R V I
              </h1>
            </div>

            {/* Form Section */}
            <div className="max-w-md mx-auto">
              <h2 className="text-3xl text-center mb-2 font-bold">
                Welcome Back
              </h2>

              <p className="text-gray-600 text-center mb-8">
                Sign in to your account to continue
              </p>

              <form className="space-y-6">
                <div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-6 py-3 bg-white rounded-full border border-gray-300 outline-none text-sm placeholder:text-gray-600"
                  />
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    type={showpassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-6 py-3 bg-white rounded-full border border-gray-300 outline-none text-sm placeholder:text-gray-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showpassword)}
                    className="absolute right-3 top-3.5"
                  >
                    {showpassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <button
                  type="submit"
                  onClick={SubmitHandler}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 rounded-full py-3 text-gray-900 font-semibold cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                >
                  Sign in
                </button>

                {/* Divider */}
                <div className="flex items-center my-6">
                  <div className="grow border-t border-gray-300"></div>
                  <span className="mx-4 text-gray-500 text-sm">or</span>
                  <div className="grow border-t border-gray-300"></div>
                </div>
                <p className=" text-center mb-2 sm:mb-0">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="hover:underline hover:text-yellow-600 underline text-black-800"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/2">
            {/* Image */}
            <img
              src="/gallery16.jpg"
              className="w-full h-full object-cover"
              alt="banner image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lo;
