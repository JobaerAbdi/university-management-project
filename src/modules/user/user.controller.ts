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

const createFaculty: RequestHandler = async (req, res, next) => {
  try {
    const { password, faculty: facultyData } = req.body;
    const result = await userServices.createFacultyIntoDB(
      password,
      facultyData,
    );
    res.status(200).json({
      success: true,
      message: 'Faculty is created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};


const createAdmin: RequestHandler = async (req, res, next) =>{
  try {
    const { password, admin: adminData } = req.body;
    const result = await userServices.createAdminIntoDB(password, adminData);
    res.status(200).json({
      success: true,
      message: 'Admin is created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const userControllers = {
  createStudentIntoDB,
  createFaculty,
  createAdmin
};
