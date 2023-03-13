import prisma from "../../db";
export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        email: true,
        firstname: true,
        lastname: true,
        courses: {
          select: {
            course: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
      },
    });
    res.status(200).json({ users});
  } catch (error) {
    console.error(error);
  }
};