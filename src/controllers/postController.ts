import { Request, Response, NextFunction } from "express";
import prisma from "../prisma";


interface AuthenticatedRequest extends Request {
  user?: { userId: number };
}


export const createPost = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, content } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId: userId,
      },
    });

    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.error("CREATE POST ERROR:", error);
    next(error);
  }
};


export const getAllPosts = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error("GET POSTS ERROR:", error);
    next(error);
  }
};


export const getMyPosts = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const myPosts = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
    });

    res.status(200).json(myPosts);
  } catch (error) {
    console.error("GET MY POSTS ERROR:", error);
    next(error);
  }
};
export const deletePost = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const postId = parseInt(req.params.id);
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    
    const existingPost = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!existingPost || existingPost.authorId !== userId) {
      res.status(403).json({ message: "Not allowed to delete this post" });
      return;
    }

    await prisma.post.delete({
      where: { id: postId },
    });

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("DELETE POST ERROR:", error);
    next(error);
  }
};
export const updatePost = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    
    const existingPost = await prisma.post.findUnique({
      where: { id: Number(id) },
    });

    if (!existingPost) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    if (existingPost.authorId !== userId) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    const updatedPost = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        title,
        content,
      },
    });

    res.status(200).json({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    console.error("UPDATE POST ERROR:", error);
    next(error);
  }
};







