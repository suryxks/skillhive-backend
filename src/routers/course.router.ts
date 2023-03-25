import express from "express";
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
  deleteAssignment,
  createModule,
  createPost,
  getPosts,
  getPostDetails,
  getModuleDetails,
  createComment,
  uploadVideo,
  uploadNotes
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
router.delete("/:courseId", param("courseId"), handleInputErrors, deleteCourse);

//ASSIGNMENTS

// create an assignment

router.post(
  "/:courseId/assignments",
  param("courseId"),
  body("title").isString(),
  body("attachment").isString().optional(),
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

//MODULES

//create a module
router.post(
  "/:courseId/modules",
  param("courseId"),
  body("title"),
  handleInputErrors,
  createModule
);

// get module details for the given module id
router.get(
  "/:courseId/modules/:moduleId",
  param("moduleId"),
  handleInputErrors,
  getModuleDetails
);

router.post("/:courseId/modules/:moduleId/vidoes",
  body("videoUrl").isString(),
  body('title').isString(),
  handleInputErrors,
  uploadVideo
)

router.post("/:courseId/modules/:moduleId/videos",
  body("notesUrl").isString(),
  body("title").isString(),
  handleInputErrors,
  uploadNotes,
 )
//Forrum posts for a course

//create a post
router.post(
  "/:courseId/posts",
  param("courseId"),
  body("userId"),
  body("title"),
  body("content"),
  handleInputErrors,
  createPost
);


//get all posts related to a course
router.post(
  "/:courseId/posts",
  param("courseId"),
  handleInputErrors,
  getPosts
);

//get everything related to a post

router.get(
  "/:courseId/posts/:postId",
  param("courseId"),
  param("postId"),
  handleInputErrors,
  getPostDetails
);

// comment on a post
router.post(
  "/:courseId/posts/:postId/comments",
  param("courseId"),
  param("postId"),
  body("userId"),
  body("content"),
  handleInputErrors,
  createComment
);
export { router as courseRouter };
