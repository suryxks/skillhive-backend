import prisma from "../../db";
export const enrollInCourse = async (req, res) => {
    const { userId, courseId } = req.params;
    try {
      const user = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          courses: {
            connect: {
              userId_courseId: {
                userId: userId,
                courseId: courseId,
              },
            },
          },
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
      res.status(200).json({ user });
    } catch (error) {
      console.error(error);
    }
  };
  