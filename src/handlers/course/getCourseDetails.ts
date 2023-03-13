import prisma from "../../db";
export const getCourseDetails=async (req, res) => {
    const { courseId } = req.params;
    try {
      const course = await prisma.course.findUnique({
        where: {
          id: courseId,
        },
      });
      res.status(200).json({  course  });
    } catch (error) {
      console.error(error);
    }
  }