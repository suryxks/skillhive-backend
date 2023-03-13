import express from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middlewares";
import {
  getUsers,
  getUserData,
  updateUser,
  deleteUser,
  enrollInCourse
} from "../handlers/users";
const router = express.Router();

//get all users
router.get("/", getUsers);

//get detials of the given user based on the user ID
router.get("/:userId", param("userId"), handleInputErrors, getUserData);

//update user data
router.post(
  "/:userId",
  param("userId"),
  body("firstname"),
  body("lastname"),
  body("email"),
  handleInputErrors,
  updateUser
);

//delete user from db
router.delete("/:userId", param("userId"), handleInputErrors, deleteUser);

//enroll user in a course
router.post(
  "/:userId/courses/:courseId",
  param("userId"),
  param("courseId"),
  handleInputErrors,
  enrollInCourse
);
export { router as userRouter };
