import dotenv from "dotenv";

dotenv.config();
import express from "express";
import cors from "cors";

import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes"; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Server is running ");
});

app.use("/api/users", userRoutes); 
app.use("/api", postRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});

