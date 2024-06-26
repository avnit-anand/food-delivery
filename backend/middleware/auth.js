import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    console.log(token)
    return res.json({ success: false, message: "not authorized login again" })
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET)
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" })
  }
}

export default authMiddleware