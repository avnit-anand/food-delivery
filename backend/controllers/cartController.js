import userModel from "../models/userModel.js";

// add items to user cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId)
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData })
    res.json({ success: true, message: "Added to cart" })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error adding to cart" })
  }
}

// remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId)
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData })
    res.json({ success: true, message: "Removed from cart" })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error removing from cart" })
  }

}

// remove all from cart
// const removeAllFromCart = async (req, res) => {
//   try {
//     let userData = await userModel.findById(req.body.userId)
//     let cartData = await userData.cartData;
//     cartData = {};
//     await userModel.findByIdAndUpdate(req.body.userId, { cartData })
//     res.json({ success: true, message: "Removed all from cart" })
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error removing all from cart" })
//   }
// }

// get user cart items
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    // console.log(cartData);
    res.json({ success: true,cartData })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching cart data" })
  }
}



export { addToCart, removeFromCart, getCart }