import prisma from "../../db";

export const getPostDetails=async (req, res) => {
    const { courseId, postId } = req.params;
    try {
      const post = await prisma.forrumPost.findUnique({
        where: {
          id: postId,
        },
        select: {
          title: true,
          content: true,
          comments: true,
          likes: true,
          user: {
            select: {
              firstname: true,
              lastname: true,
              id: true,
            },
          },
        },
      });
      res.status(200).json({ data: { post: post } });
    } catch (error) {
      console.error(error);
    }
  }