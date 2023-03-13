import prisma from "../../db";
export const deleteCourse= async (req, res) => {
    const { courseId } = req.params;
    try {
      await prisma.$transaction([
        prisma.courseEnrollment.deleteMany({
          where: {
            courseId: courseId,
          },
        }),
        prisma.course.delete({
          where: {
            id: courseId,
          },
        }),
      ]);
      res.status(204);
    } catch (error) {
      console.error(error);
    }
  }