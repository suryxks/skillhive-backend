import prisma from "../../db";

export const getPosts=async (req, res) => {
    const { courseId } = req.params;
    try {
      const posts = await prisma.forrumPost.findMany({
        where: {
          course: courseId,
        },
        select: {
          title: true,
          content: true,
          id: true,
          user: {
            select: {
              id: true,
              firstname: true,
              lastname: true,
            },
          },
        },
      });
      res.status(200).json({  posts  });
    } catch (error) {
      console.error(error);
    }
  }