import { RequestHandler } from 'express';
import { userServices } from './user.service';

const createStudentIntoDB: RequestHandler = async (req, res, next) => {
  try {
    const { password, studentData } = req.body;
    const result = await userServices.createStudentIntoDB(
      password,
      studentData,
    );
    res.status(201).json({
      success: true,
      messages: 'Student created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
export const userControllers = {
  createStudentIntoDB,
};
