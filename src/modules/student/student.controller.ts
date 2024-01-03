import { RequestHandler } from 'express';
import { studentServices } from './student.service';

const getAllStudentsFromDB: RequestHandler = async (req, res, next) => {
  try {
    const query = req.query    
    const result = await studentServices.getAllStudentsFromDB(query);
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


const updateStudentIntoDB: RequestHandler = async(req, res, next)=>{
  try {
    const {studentId} = req.params
    const {studentData} = req.body
    const result = await studentServices.updateStudentIntoDB(studentId, studentData)
    res.status(200).json({
    success: true,
    message: 'Student is update successfully',
    data: result
  })
  } catch (error) {
    next(error)
  }
};


const deleteStudentFromDB: RequestHandler = async (req, res,next) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.deleteStudentFromDB(studentId);
    res.status(201).json({
      success: true,
      messages: 'Student is deleted successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const studentControllers = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDB,
  deleteStudentFromDB
};
