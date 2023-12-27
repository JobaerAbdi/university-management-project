import { RequestHandler } from "express";
import { createAcademicFacultyServices } from "./academicFaculty.service";

const createAcademicFacultyIntoDB:RequestHandler =async (req, res)=>{
    const {academicFaculty} = req.body
    const result = await createAcademicFacultyServices.createAcademicFacultyIntoDB(academicFaculty)
    res.status(201).json({
      success: true,
      message: 'Academic faculty is created successfully',
      data: result
    })
  };

  export const academicFacultyControllers = {
    createAcademicFacultyIntoDB,
  };