import { RequestHandler } from 'express';
import { studentServices } from './student.service';

const getAllStudentsFromDB: RequestHandler = async (req, res,next) => {
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

const getSingleStudentFromDB: RequestHandler = async (req, res,next) => {
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
