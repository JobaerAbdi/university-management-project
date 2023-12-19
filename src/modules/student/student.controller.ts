import { Request, Response } from 'express';
import { studentServices } from './student.service';

const createStudentIntoDB = async (req: Request, res: Response) => {
  try {
    const { student } = req.body;
    const result = await studentServices.createStudentIntoDB(student);
    res.status(201).json({
      success: true,
      messages: 'Student created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      messages: 'Student not found',
      error: {
        code: 400,
        description: 'Student not found',
      },
    });
  }
};

const getAllStudentsFromDB = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudentsFromDB();
    res.status(201).json({
      success: true,
      messages: 'Students are retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      messages: 'Student not found',
      error: {
        code: 400,
        description: 'Student not found',
      },
    });
  }
};

const getSingleStudentFromDB = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.getSingleStudentFromDB(studentId);
    res.status(201).json({
      success: true,
      messages: 'Student is retrieved successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      messages: 'Student not found',
      error: {
        code: 400,
        description: 'Student not found',
      },
    });
  }
};

export const studentControllers = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
