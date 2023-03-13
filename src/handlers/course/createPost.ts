import prisma from "../../db";

export const createPost = async (req, res) => {
  const { courseId } = req.params;
  const { userId, title, content } = req.body;
  try {
    const post = await prisma.forrumPost.create({
      data: {
        title: title,
        content: content,
        user: {
          connect: {
            id: userId,
          },
        },
        course: {
          connect: {
            id: courseId,
          },
        },
      },
      include: {
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
          },
        },
      },
    });
    res.status(201).json({ post });
  } catch (error) {
    console.error(error);
  }
};
