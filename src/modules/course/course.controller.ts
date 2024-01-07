import { RequestHandler } from 'express';
import { courseServices } from './course.services';

const createCourse: RequestHandler = async (req, res, next) => {
  try {
    const { courseData } = req.body;
    const result = await courseServices.createCourseIntoDB(courseData);
    res.status(200).json({
      success: true,
      message: 'Course is created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllCourse: RequestHandler = async (req, res, next) => {
  try {
    const result = await courseServices.getAllCourseFromDB()
    res.status(200).json({
      success: true,
      message: 'All course are retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getSingleCourse: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await courseServices.getSingleCourseFromDB(id);
    res.status(200).json({
      success: true,
      message: 'Single course is retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
/*
const updateCourse: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params
    const {courseData} = req.body
    const result = await courseServices.getSingleCourseFromDB(id, courseData);
    res.status(200).json({
      success: true,
      message: 'Single course is retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
*/

const deleteCourse: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await courseServices.deleteCourseFromDB(id);
    res.status(200).json({
      success: true,
      message: 'Course is deleted successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const courseControllers = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  // updateCourse
  deleteCourse,
};
