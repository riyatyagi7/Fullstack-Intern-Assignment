import { createPost } from "../controllers/postController";

import express from "express";
import { registerUser, loginUser } from "../controllers/userController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authenticateToken, (req, res) => {
    res.status(200).json({ message: "Access granted to protected route" });
  });
  


  router.post("/posts",  createPost);


export default router;



