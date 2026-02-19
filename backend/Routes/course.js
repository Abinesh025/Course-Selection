import express from "express";
import { createCourse, getCourse } from "../Controllers/courseController.js";
const courses = express();

courses.route("/course").post(createCourse);
courses.route("/allCourse").get(getCourse);

export default courses;