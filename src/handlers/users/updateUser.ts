import prisma from "../../db";
export const updateUser = async (req, res) => {
    const { userId } = req.params;
    const { firstname, lastname, email } = req.body;
    try {
      const user = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          firstname: firstname,
          lastname: lastname,
          email: email,
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