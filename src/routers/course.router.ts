import express from "express";
import prisma from "../db";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middlewares";

const router = express.Router();

router.post(
  "/",
  body("userId").isString(),
  body("name").isString(),
  body("description").isString(),
  handleInputErrors,
  async (req, res) => {
    const { name, description, userId } = req.body;
    try {
      const course = await prisma.course.create({
        data: {
          name: name,
          description: description,
          members: {
            create: {
              role: "TEACHER",
              user: {
                connect: {
                  id: userId,
                },
              },
            },
          },
        },
      });
      res.status(201).json({ data: course });
    } catch (error) {
      console.error(error);
    }
  }
);
router.get(
  "/:courseId",
  param("courseId"),
  handleInputErrors,
  async (req, res) => {
    const { courseId } = req.params;
    try {
      const course = await prisma.course.findUnique({
        where: {
          id: courseId,
        },
      });
      res.status(200).json({ data: { course } });
    } catch (error) {
      console.error(error);
    }
  }
);
router.post(
  "/:courseId",
  param("courseId"),
  body("name").isString(),
  body("description").isString(),
  handleInputErrors,
  async (req, res) => {
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
      res.status(200).json({ data: course });
    } catch (error) {
      console.error(error);
    }
  }
);

router.delete(
  "/:courseId",
  param("courseId"),
  handleInputErrors,
  async (req, res) => {
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
);

//assignments

router.post(
  "/:courseId/assignments",
  param("courseId"),
  body("title").isString(),
  body("description").isString(),
  body("startTime").isDate().optional(),
  body("endTime").isDate().optional(),
  body("marks").isNumeric().optional(),
  handleInputErrors,
  async (req, res) => {
    const { courseId } = req.params;
    const { title, description, startTime, endTime, marks } = req.body;
    try {
      const assignment = await prisma.assignment.create({
        data: {
          title: title,
          description: description,
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
        res.status(201).json({data:{assignment:assignment}})
    } catch (error) {
      console.error(error);
    }
  }
);
router.get(
    "/assignments/:assignmentId",
    param("assignmentId"),
    handleInputErrors,
    async (req, res) => {
      const { assignmentId } = req.params;
        try {
            const assignment = await prisma.assignment.findUnique({
                where: {
                   id:assignmentId
               }
           })
       res.status(200).json({data:{assignment:assignment}})
      } catch (error) {
        console.error(error);
      }
    }
  );
export { router as courseRouter };
