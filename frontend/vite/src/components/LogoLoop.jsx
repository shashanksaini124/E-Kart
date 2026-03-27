import React from "react";

const LogoLoop = () => {
  const logos = [
    "/logo1.png",
    "/logo2.png",
    "/logo3.png",
    "/logo4.png",
    "/logo5.png",
  ];

  return (
    <div className="overflow-hidden bg-white py-6">
      <div className="relative w-full">

        {/* GRADIENT FADE */}
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10" />

        {/* LOOP TRACK */}
        <div className="flex gap-10 animate-scroll whitespace-nowrap">
          {[...logos, ...logos].map((logo, i) => (
            <img
              key={i}
              src={logo}
              className="h-10 sm:h-12 md:h-14 object-contain opacity-70 hover:opacity-100 transition"
              alt="logo"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoLoop;