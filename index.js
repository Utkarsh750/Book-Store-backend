import express, { request, response } from "express";
// import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from './models/bookModels.js'
import booksRoute from "./routes/bookRoutes.js"
import cors from 'cors'

const app = express();
app.use(cors())

// Middleware for parsing request body
app.use(express.json())
app.use('/books', booksRoute)
const PORT = process.env.PORT || 3000;

// Middleware for handling CORS Policy
// Option 1: Allow All Origins with Default of cors(*)

// Option 2: Allow Custom Origins
// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST', 'PUT' , 'DELETE'],
//   allowedHeaders: ['Content-Type'],
// }))

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to MERN project");
});


mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
