import prisma from "../../db";

export const createComment=async (req, res) => {
    const { courseId, postId } = req.params;
    const { content, userId } = req.body;
    try {
      const post = await prisma.forrumComment.create({
        data: {
          content: content,
          user: {
            connect: {
              id: userId,
            },
          },
          post: {
            connect: {
              id: postId,
            },
          },
        },
        select: {
          content: true,
          user: {
            select: {
              firstname: true,
              lastname: true,
              id: true,
            },
          },
          post: true,
        },
      });
      res.status(201).json({  post  });
    } catch (error) {
      console.error(error);
    }
  }