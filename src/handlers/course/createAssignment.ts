import prisma from "../../db";
export const createAssignment=async (req, res) => {
    const { courseId } = req.params;
    const { title, description, startTime, endTime, marks,attachment } = req.body;
    try {
      const assignment = await prisma.assignment.create({
        data: {
          title: title,
          description: description,
          attachment:attachment?attachment:null,
          marks: marks ? marks : null,
          startTime: startTime,
          endTime: endTime ? endTime : null,
          course: {
            connect: {
              id: courseId,
            },
          },
        },
      });
      res.status(201).json({ assignment});
    } catch (error) {
      console.error(error);
    }
  }