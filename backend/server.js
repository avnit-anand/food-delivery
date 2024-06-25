import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import "dotenv/config.js"
// app config
const app = express();
const port = 9000;

// middlewares
app.use(express.json()); // use for parsing frontend to backend requests
app.use(cors()); // use for parsing backend requests to frontend requests

// Db Connection
connectDB();

// api endpoint
app.use('/api/food',foodRouter)
app.use('/images',express.static('uploads'))
app.use('/api/user',userRouter)

app.get('/', (req,res)=>{
  res.send("API Working")
})

app.listen(port, ()=>{
  console.log(`Server is running on port ${port}`)
})
