const mongoose = require("mongoose");

const connectDB = async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/Ekart`);
        console.log("Database Connected succesfully");
       
        
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = connectDB;