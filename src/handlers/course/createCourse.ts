import prisma from "../../db";
export const createCourse=async (req, res) => {
    const { name, description, userId } = req.body;
  try {
    const course = await prisma.course.create({
      data: {
        name: name,
        description: description,
        members: {
          create: {
            role: "TEACHER",
            user: {
              connect: {
                id: userId,
              },
            },
          },
        },
      },
    });
    res.status(201).json({course});
    } catch (error) {
      console.error(error);
    }
  }