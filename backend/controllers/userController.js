import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email })

    // user check
    if (!user) {
      return res.json({ success: false, message: "user not found" })
    }

    // password check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "invalid password" })
    }

    // generate token
    const token = createToken(user._id)
    res.json({ success: true, token: token })

  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "error logging in" })
  }
}

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET)
}

// register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // email already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "email already exists" })
    }

    // email is valid
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "invalid email" })
    }

    // password is valid
    if (password.length < 8) {
      return res.json({ success: false, message: "not a strong password" });
    }

    // hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashPassword
    })

    const user = await newUser.save();
    const token = createToken(user._id)
    // console.log(user);
    res.json({ success: true, token })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

export { loginUser, registerUser }