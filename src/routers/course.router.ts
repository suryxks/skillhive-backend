import express from "express";
import prisma from "../db";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middlewares";
import {
  createAssignment,
  createCourse,
  deleteCourse,
  editAssignmentDetails,
  getAssignmentDetails,
  getCourseDetails,
  updateCourseDetails,
  deleteAssignment
} from "../handlers/course";
const router = express.Router();
// create a course
router.post(
  "/",
  body("userId").isString(),
  body("name").isString(),
  body("description").isString(),
  handleInputErrors,
  createCourse
);

//get course details for the given course Id
router.get(
  "/:courseId",
  param("courseId"),
  handleInputErrors,
  getCourseDetails
);

//   update course details
router.post(
  "/:courseId",
  param("courseId"),
  body("name").isString(),
  body("description").isString(),
  handleInputErrors,
  updateCourseDetails
);


//delete course and unenroll all from the course
router.delete(
  "/:courseId",
  param("courseId"),
  handleInputErrors,
  deleteCourse
);

//ASSIGNMENTS

// create an assignment

router.post(
  "/:courseId/assignments",
  param("courseId"),
  body("title").isString(),
  body("description").isString(),
  body("startTime").isDate().optional(),
  body("endTime").isDate().optional(),
  body("marks").isNumeric().optional(),
  handleInputErrors,
  createAssignment
);

// get assignment details
router.get(
  "/assignments/:assignmentId",
  param("assignmentId"),
  handleInputErrors,
  getAssignmentDetails
);

// edit assignment details
router.post(
  "/assignments/:assignmentId",
  param("assignmentId"),
  body("title").isString(),
  body("description").isString(),
  body("startTime").isDate().optional(),
  body("endTime").isDate().optional(),
  body("marks").isNumeric().optional(),
  handleInputErrors,
  editAssignmentDetails
);

//delete assignment
router.delete(
  "/assignments/:assignmentId",
  param("assignmentId"),
  handleInputErrors,
  deleteAssignment
);

//modules

router.post(
  "/:courseId/modules",
  param("courseId"),
  body("title"),
  handleInputErrors,
  async (req, res) => {
    const { courseId } = req.params;
    const { title } = req.body;
    try {
      const module = await prisma.module.create({
        data: {
          title: title,
          course: {
            connect: {
              id: courseId,
            },
          },
        },
        select: {
          course: {
            select: {
              name: true,
              id: true,
              modules: true,
            },
          },
          videos: true,
          lectureNotes: true,
        },
      });
      res.status(201).json({ data: { module: module } });
    } catch (error) {
      console.error(error);
    }
  }
);
router.get(
  "/modules/:moduleId",
  param("moduleId"),
  handleInputErrors,
  async (req, res) => {
    const { moduleId } = req.params;
    try {
      const module = await prisma.module.findUnique({
        where: {
          id: moduleId,
        },
        select: {
          course: {
            select: {
              name: true,
              id: true,
              modules: true,
            },
          },
          videos: true,
          lectureNotes: true,
        },
      });
      res.status(201).json({ data: { module: module } });
    } catch (error) {
      console.error(error);
    }
  }
);

//Forrum posts for a course

//create a post
router.post(
  "/:courseId/posts",
  param("courseId"),
  body("userId"),
  body("title"),
  body("content"),
  handleInputErrors,
  async (req, res) => {
    const { courseId } = req.params;
    const { userId, title, content } = req.body;
    try {
      const post = await prisma.forrumPost.create({
        data: {
          title: title,
          content: content,
          user: {
            connect: {
              id: userId,
            },
          },
          course: {
            connect: {
              id: courseId,
            },
          },
        },
        include: {
          user: {
            select: {
              id: true,
              firstname: true,
              lastname: true,
            },
          },
        },
      });
      res.status(201).json({ data: { post: post } });
    } catch (error) {
      console.error(error);
    }
  }
);
//get all posts related to a course
router.post(
  "/:courseId/posts",
  param("courseId"),
  handleInputErrors,
  async (req, res) => {
    const { courseId } = req.params;
    try {
      const posts = await prisma.forrumPost.findMany({
        where: {
          course: courseId,
        },
        select: {
          title: true,
          content: true,
          id: true,
          user: {
            select: {
              id: true,
              firstname: true,
              lastname: true,
            },
          },
        },
      });
      res.status(200).json({ data: { posts: posts } });
    } catch (error) {
      console.error(error);
    }
  }
);

//get everything related to a post

router.get(
  "/:courseId/posts/:postId",
  param("courseId"),
  param("postId"),
  handleInputErrors,
  async (req, res) => {
    const { courseId, postId } = req.params;
    try {
      const post = await prisma.forrumPost.findUnique({
        where: {
          id: postId,
        },
        select: {
          title: true,
          content: true,
          comments: true,
          likes: true,
          user: {
            select: {
              firstname: true,
              lastname: true,
              id: true,
            },
          },
        },
      });
      res.status(200).json({ data: { post: post } });
    } catch (error) {
      console.error(error);
    }
  }
);
router.post(
  "/:courseId/posts/:postId/comments",
  param("courseId"),
  param("postId"),
  body("userId"),
  body("content"),
  handleInputErrors,
  async (req, res) => {
    const { courseId, postId } = req.params;
    const { content, userId } = req.body;
    try {
      const post = await prisma.forrumComment.create({
        data: {
          content: content,
          user: {
            connect: {
              id: userId,
            },
          },
          post: {
            connect: {
              id: postId,
            },
          },
        },
        select: {
          content: true,
          user: {
            select: {
              firstname: true,
              lastname: true,
              id: true,
            },
          },
          post: true,
        },
      });
      res.status(201).json({ data: { post: post } });
    } catch (error) {
      console.error(error);
    }
  }
);
export { router as courseRouter };
