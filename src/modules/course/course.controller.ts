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

export const courseControllers = {
    createCourse,
};
