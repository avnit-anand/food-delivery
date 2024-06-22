import mongoose from "mongoose";

export const connectDB = async () =>{
  await mongoose.connect('mongodb+srv://avnitkumaranand1806:avnit202051040@fooddelivery.hnnbffm.mongodb.net/foodDelivery').then(()=>{
    console.log("DB Connected")
  })
}