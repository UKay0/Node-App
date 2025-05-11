import express from "express";
import cors from "cors";
import connectToMongoDB from "./db/db.js";
import authRoutes from "./routes/auth.js";
import noteRoutes from "./routes/note.js";
const app = express();
// import dotenv from "dotenv";

// dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/note", noteRoutes);

app.listen(5000, () => {
  connectToMongoDB();
  console.log("Server is running on port 5000");
});
