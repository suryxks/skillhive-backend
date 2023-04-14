import prisma from "../../db";
export const getUserData = async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          email: true,
          firstname: true,
          lastname: true,
          courses: {
            select: {
              role: true,
              courseId: true,
              course:true,
            },
          },
        },
      });
      res.status(200).json({ user });
    } catch (error) {
      console.error(error);
    }
  };