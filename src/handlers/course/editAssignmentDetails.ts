import prisma from "../../db";
export const editAssignmentDetails=  async (req, res) => {
    const { assignmentId } = req.params;
    const { title, description, startTime, endTime, marks } = req.body;
    try {
      const assignment = await prisma.assignment.update({
        where: {
          id: assignmentId,
        },
        data: {
          title: title,
          description: description,
          marks: marks ? marks : null,
          startTime: startTime,
          endTime: endTime ? endTime : null,
        },
      });
      res.status(200).json({  assignment });
    } catch (error) {
      console.error(error);
    }
  }