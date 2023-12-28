import { RequestHandler } from "express";
import { academicDepartmentServices } from "./academicDepartment.service";

const createAcademicDepartmentIntoDB: RequestHandler=async(req, res, next)=>{
  try {
    const {academicDepartment} = req.body
    const result = await academicDepartmentServices.createAcademicDepartmentIntoDB(academicDepartment)
    res.status(201).json({
    success: true,
    message: 'Academic department is created successfully',
    data: result
  })
  } catch (error) {
    next(error)
  }
};



export const academicDepartmentControllers = {
    createAcademicDepartmentIntoDB,
};