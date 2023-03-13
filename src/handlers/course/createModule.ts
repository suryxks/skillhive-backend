import prisma from "../../db";

export const createModule=  async (req, res) => {
    const { courseId } = req.params;
    const { title } = req.body;
    try {
      const module = await prisma.module.create({
        data: {
          title: title,
          course: {
            connect: {
              id: courseId,
            },
          },
        },
        select: {
          course: {
            select: {
              name: true,
              id: true,
              modules: true,
            },
          },
          videos: true,
          lectureNotes: true,
        },
      });
      res.status(201).json({ module });
    } catch (error) {
      console.error(error);
    }
  }