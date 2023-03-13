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
              course: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
      res.status(200).json({ data: { user: user } });
    } catch (error) {
      console.error(error);
    }
  };