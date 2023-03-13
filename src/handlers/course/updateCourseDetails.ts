import prisma from "../../db";
export const updateCourseDetails=  async (req, res) => {
    const { courseId } = req.params;
    const { name, description } = req.body;
    try {
      const course = await prisma.course.update({
        where: {
          id: courseId,
        },
        data: {
          name: name,
          description: description,
        },
      });
      res.status(200).json({  course });
    } catch (error) {
      console.error(error);
    }
  }