// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     products: [
//       {
//         productId: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Product",
//           required: true,
//         },

//         quantity: {
//           type: Number,
//           required: true,
//         },

//         // 🔥 ADD THIS (MAIN FIX)
//         color: {
//           type: String,
//         },
//         size: {
//           type: String,
//         },
        
//       },
//     ],

//     amount: {
//       type: Number,
//       required: true,
//     },
//     tax: {
//       type: Number,
//       required: true,
//     },
//     shipping: {
//       type: Number,
//       required: true,
//     },
//     currency: {
//       type: String,
//       default: "INR",
//     },
//     status: {
//       type: String,
//       enum: ["Pending", "Paid", "Failed"],
//       default: "Pending",
//     },
//     razorpayOrderId: String,
//     razorpayPaymentId: String,
//     razorpaySignature: String,
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Order", orderSchema);

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        color: {
          type: String,
          default: "N/A",
        },
        size: {
          type: String,
          default: "N/A",
        },
      },
    ],

    amount: {
      type: Number,
      required: true,
    },

    tax: {
      type: Number,
      default: 0,
    },

    shipping: {
      type: Number,
      default: 0,
    },

    currency: {
      type: String,
      default: "INR",
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "ONLINE"],
      default: "ONLINE",
    },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },

    razorpayOrderId: {
      type: String,
      default: null,
    },

    // ✅ 🔥 MAIN ADDITION (VERY IMPORTANT)
    shippingAddress: {
      fullName: String,
      phone: String,
      email: String,
      address: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);