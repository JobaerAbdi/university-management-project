import { RequestHandler } from 'express';
import { admissionSemesterServices } from './admissionSemester.service';

const createAdmissionSemesterIntoDB: RequestHandler = async (req, res, next) => {
 try {
    const {admissionSemesterData} = req.body;
    const result = await admissionSemesterServices.createAdmissionSemesterIntoDB(admissionSemesterData);
      res.status(201).json({
        success: true,
        message: 'Admission semester created is successfully',
        data: result,
      });
 } catch (error) {
    next(error)
 }
};

const getAllAdmissionSemestersFromDB: RequestHandler = async(req, res, next)=>{
   try {
    const result = await admissionSemesterServices.getAllAdmissionSemestersFromDB()
    res.status(200).json({
      success: true,
      message: "All admission semesters are retrieved successfully!",
      data: result
    })
   } catch (error) {
    next(error)
   }
};

export const admissionSemesterControllers = {
  createAdmissionSemesterIntoDB,
  getAllAdmissionSemestersFromDB
};
