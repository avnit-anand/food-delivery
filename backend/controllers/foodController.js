import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item
const addFood = async (req,res)=>{

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
      name:req.body.name,
      description:req.body.description,
      price:req.body.price,
      image:image_filename,
      category:req.body.category
    })

    try {
      await food.save();
      res.json({success:true,message:"food added successfully"})
    } catch (error) {
      console.log(error); 
      res.json({success:false,message:"food not added"})
    }
}

// list food item
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({success:true,data:foods})
  } catch (error) {
    res.json({success:false,message:"cannot find items"})
  }
}

// remove food item
const removeFood = async (req, res) => {
  try{
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`,()=>{})
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({success:true,message:"food removed successfully"})
  }catch (error) {
    console.log(error);
    res.json({success:false,message:"error removing food"})
  }
}

export {addFood ,listFood, removeFood}