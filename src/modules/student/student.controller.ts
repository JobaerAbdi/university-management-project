import { NextFunction, Request, Response } from 'express';
import { studentServices } from './student.service';

const getAllStudentsFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await studentServices.getAllStudentsFromDB();
    res.status(201).json({
      success: true,
      messages: 'Students are retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getSingleStudentFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.getSingleStudentFromDB(studentId);
    res.status(201).json({
      success: true,
      messages: 'Student is retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const studentControllers = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
