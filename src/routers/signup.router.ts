import express from "express";
import prisma from "../db";
import { body } from "express-validator";
import { hashPassword, createJwt } from "../utils";
import { handleInputErrors } from "../middlewares/";
const router = express.Router();
router.post(
  "/",
  body("firstname").isString(),
  body("email").isEmail(),
  body("password").isString().isLength({ min: 8, max: 11 }),
  body("lastname").isString(),
  handleInputErrors,
  async (req, res, next) => {
    const { firstname, lastname, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    try {
      const user = await prisma.user.create({
        data: {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: hashedPassword,
        },
        select: {
          firstname: true,
          id: true,
          lastname: true,
          email: true,
          courses: {
            select: {
              role: true,
              courseId: true,
              course: true,
            },
          },
        },
      });
      const token = createJwt(user);

      res.json({token,user}).status(201);
    } catch (error) {
      next(error);
    }
  }
);
export { router as signupRouter };
