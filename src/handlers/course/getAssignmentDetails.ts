import prisma from "../../db";

export const getAssignmentDetails=async (req, res) => {
    const { assignmentId } = req.params;
    try {
      const assignment = await prisma.assignment.findUnique({
        where: {
          id: assignmentId,
        },
      });
      res.status(200).json({  assignment });
    } catch (error) {
      console.error(error);
    }
  }