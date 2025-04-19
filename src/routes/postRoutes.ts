import express from "express";
import { createPost, getAllPosts, getMyPosts, deletePost ,updatePost ,} from "../controllers/postController";

import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authenticateToken, createPost);
router.get("/", getAllPosts);
router.get("/mine", authenticateToken, getMyPosts);
router.delete("/:id", authenticateToken, deletePost);
router.put("/:id", authenticateToken, updatePost);


export default router;


