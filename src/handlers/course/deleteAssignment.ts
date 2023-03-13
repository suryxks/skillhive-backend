import prisma from "../../db";

export const deleteAssignment=  async (req, res) => {
    const { assignmentId } = req.params;
    try {
      await prisma.assignment.delete({
        where: {
          id: assignmentId,
        },
      });
      res.status(204);
    } catch (error) {
      console.error(error);
    }
  }