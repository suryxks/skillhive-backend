import prisma from "../../db";

export const getModuleDetails=async (req, res) => {
    const { moduleId } = req.params;
    try {
      const module = await prisma.module.findUnique({
        where: {
          id: moduleId,
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