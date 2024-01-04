import { RequestHandler } from 'express';
import { facultyServices } from './faculty.services';

const createFacultyIntoDB: RequestHandler = async (req, res, next) => {
  try {
    const { facultyData } = req.body;
    const result = await facultyServices.createFacultyIntoDB(facultyData);
    res.send(201).json({
      success: true,
      message: 'Faculty is created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const facultyControllers = {
  createFacultyIntoDB,
};
