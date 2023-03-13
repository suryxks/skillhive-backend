import prisma from "../../db";
export const deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
      await prisma.user.delete({
        where: {
          id: userId,
        },
      });
      res.status(204).json({ data: { message: "user deleted" } });
    } catch (error) {
      console.error(error);
    }
  };