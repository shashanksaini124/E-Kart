require("dotenv").config()
// importation
const express = require('express')
const app = express()
const connectDB = require("./database/db.js");
const userRoute = require("./routes/userRoute.js")
const cors = require("cors")
const cartRoute = require("./routes/cartRoute.js")
const orderRoute = require("./routes/orderRoute.js")
const productRoute = require("./routes/productRoute.js")

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

// port
PORT = process.env.PORT || 8000;

// middleware
app.use(express.json())

// routes
app.get("/",(req,res)=>{        // 1
    res.send("hey")  
})

//api
app.use("/api/v1/user",userRoute)       // 2
app.use("/api/v1/product",productRoute)                                        // 3
 app.use("/api/v1/cart",cartRoute)       // 3
 app.use("/api/v1/orders",orderRoute)       // 3

app.listen(PORT,()=>{
    connectDB()
    console.log(`server is running on port: ${PORT}`);
    
})