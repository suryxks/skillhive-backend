import express from "express";
import prisma from "../db";
import { body } from "express-validator";
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
         res.status(201).json({data:course}) 
      } catch (error) {
          console.error(error)
      }
  
      
      
  }
);

export { router as courseRouter };
