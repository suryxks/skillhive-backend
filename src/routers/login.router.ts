import express from "express";
import prisma from "../db";
import { body } from "express-validator";
import { comparePassword, createJwt } from "../utils";
import { handleInputErrors } from "../middlewares/";

const router = express.Router();

router.get(
  "/",
  body("email").isEmail(),
  body("password").isString().isLength({ min: 8, max: 11 }),
  handleInputErrors,
  async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (user) {
        const { password: hashedPassword } = user;
          const isPasswordCorrect = await comparePassword(password, hashedPassword);
          if (!isPasswordCorrect) {
              res.status(401).json({ message: 'Unothorised access' })
          }
          const token = createJwt(user);
          res.status(200).json({data:{token:token}})
      } else {
        res.status(404).json({message:'user not found'})
      }
    } catch (error) {
      next(error);
    }
  }
);
export {router as loginRouter}