// import React, { useState } from "react";
// import Zoom from "react-medium-image-zoom";
// import "react-medium-image-zoom/dist/styles.css";

// const ProductImg = ({ images }) => {
//   const [mainImg, setMainImg] = useState(images[0].url);

//   return (
//     <div className="flex gap-5 w-max">
//       <div className="gap-5 flex flex-col">
//         {images.map((img) => {
//           return (
//             <img
//               key={img.url}
//               onClick={() => setMainImg(img.url)}
//               src={img.url}
//               alt=""
//               className="cursor-pointer w-20 border h-20 shadow-lg"
//             />
//           );
//         })}
//       </div>

//       <Zoom>
//         <img
//           src={mainImg}
//           alt=""
//           className="w-[500px] border shadow-lg"
//         />
//       </Zoom>
//     </div>
//   );
// };

// export default ProductImg;

import React, { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const ProductImg = ({ images }) => {
  const [mainImg, setMainImg] = useState(images?.[0]?.url);

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">

      {/* Thumbnails */}
      <div className="
        flex md:flex-col 
        gap-2 
        overflow-x-auto md:overflow-hidden
      ">
        {images.map((img) => (
          <img
            key={img.url}
            onClick={() => setMainImg(img.url)}
            src={img.url}
            alt=""
            className="
              cursor-pointer 
              w-14 h-14 sm:w-16 sm:h-16 
              object-cover 
              border 
              rounded-md
            "
          />
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 flex justify-center">
        <Zoom>
          <img
            src={mainImg}
            alt=""
            className="
              w-full 
              max-w-xs 
              sm:max-w-sm 
              md:max-w-md 
              lg:max-w-lg 
              object-contain 
              border 
              rounded-lg
            "
          />
        </Zoom>
      </div>
    </div>
  );
};

export default ProductImg;