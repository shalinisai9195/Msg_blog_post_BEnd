import express  from "express";
import DBConnect from "./db/db.js";
import userRouter from "./routes/user_router.js";
import blogRouter from "./routes/blog_router.js";
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

DBConnect();
const app = express();
const port = process.env.PORT || 5656;

app.use(express.json());
app.use(cors())
app.use('/api/user',userRouter) //http://localhost:5000/api/user
app.use('/api/blog',blogRouter)


app.listen(port, ()=>{
  console.log(`App litening a port ${port}`)
});