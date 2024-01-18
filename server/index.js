import express from "express";
import cors from 'cors';
import connectDB from './config/database.js';
import dotenv from 'dotenv';
import { userRouter } from './routes/auth.js';
import { recipeRouter } from './routes/recipes.js';
import { RecipeModel } from "./models/Recipes.js";
import multer from 'multer'

// .env config
dotenv.config({ path: './config/.env' });

connectDB()

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", userRouter, recipeRouter);

//-----------------adding here
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })



app.get("/create/api/posts",  async (req, res) => {
  // const posts = await prisma.posts.findMany({orderBy: [{ created: 'desc'}]})
  const posts = await RecipeModel.find().sort({created: 'desc'})
  res.send(posts)
})


app.post('/create/api/posts', upload.single('image'), async (req, res) => {
 console.log("req.body", req.body)
 console.log("req.file", req.body)
  res.send({})
})

app.delete("/create/api/posts/:id", async (req, res) => {
const id=+req.params.id
  res.send({})
})

//--------------------------------

app.listen(process.env.PORT || "3001", () => {
    console.log(`server is running on ${process.env.PORT}`);
  });