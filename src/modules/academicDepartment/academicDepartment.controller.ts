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

const getAllAcademicDepartmentsFromDB: RequestHandler = async(req, res, next)=>{
  try {
    const result = await academicDepartmentServices.getAllAcademicDepartmentsFromDB()
    res.status(200).json({
      success: true,
      message: 'All academic departments are retrieved successfully',
      data: result
    })
  } catch (error) {
    next(error)
  }
};

const getSingleAcademicDepartmentFromDB: RequestHandler = async(req, res, next)=>{
  try {
    const {departmentId} = req.params
    const result = await academicDepartmentServices.getSingleAcademicDepartmentFromDB(departmentId)
    res.status(200).json({
      success: true,
      message: 'Academic department is retrieved successfully',
      data: result
    })
  } catch (error) {
    next(error)
  }
};

const updateAcademicDepartmentIntoDB: RequestHandler = async(req, res, next)=>{
  try {
    const {departmentId} = req.params
    const {academicDepartment} = req.body
    const result = await academicDepartmentServices.updateAcademicDepartmentIntoDB(departmentId, academicDepartment)
  res.status(200).json({
    success: true,
    message: 'Academic department is update successfully',
    data: result
  })
  } catch (error) {
    next(error)
  }
};



export const academicDepartmentControllers = {
    createAcademicDepartmentIntoDB,
    getAllAcademicDepartmentsFromDB,
    getSingleAcademicDepartmentFromDB,
    updateAcademicDepartmentIntoDB
};