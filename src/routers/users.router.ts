import express from "express";
import prisma from "../db";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middlewares";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        email: true,
        firstname: true,
        lastname: true,
        courses: {
          select: {
            course: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
      },
    });
    res.status(200).json({ data: { users: users } });
  } catch (error) {
    console.error(error);
  }
});
router.get("/:userId", param("userId"), handleInputErrors, async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
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
    res.status(200).json({ data: { user: user } });
  } catch (error) {
    console.error(error);
  }
});
router.post(
  "/:userId",
  param("userId"),
  body("firstname"),
  body("lastname"),
  body("email"),
  handleInputErrors,
  async (req, res) => {
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
      res.status(200).json({ data: { user: user } });
    } catch (error) {
      console.error(error);
    }
  }
);
router.delete(
  "/:userId",
  param("userId"),
  handleInputErrors,
  async (req, res) => {
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
  }
);
router.post(
  "/:userId/courses/:courseId",
  param("userId"),
  param("courseId"),
  handleInputErrors,
  async (req, res) => {
    const { userId, courseId } = req.params;
    try {
      const user = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          courses: {
            connect: {
              userId_courseId: {
                userId: userId,
                courseId: courseId,
              },
            },
          },
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
      res.status(200).json({ data: { user: user } });
    } catch (error) {
      console.error(error);
    }
  }
);
export { router as userRouter };
