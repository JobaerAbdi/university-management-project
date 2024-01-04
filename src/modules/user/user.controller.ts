import { RequestHandler } from 'express';
import { userServices } from './user.service';

//             create student
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


//              create faculty
const createFacultyIntoDB: RequestHandler = async (req, res, next) => {
  try {
    const {password,  facultyData } = req.body;
    const result = await userServices.createFacultyIntoDB(password , facultyData);
    res.send(201).json({
      success: true,
      message: 'Faculty is created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const userControllers = {
  createStudentIntoDB,
  createFacultyIntoDB
};
