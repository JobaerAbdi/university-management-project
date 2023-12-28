import { RequestHandler } from "express";
import { createAcademicFacultyServices } from "./academicFaculty.service";

const createAcademicFacultyIntoDB:RequestHandler =async (req, res, next)=>{
   try {
    const {academicFaculty} = req.body
    const result = await createAcademicFacultyServices.createAcademicFacultyIntoDB(academicFaculty)
    res.status(201).json({
      success: true,
      message: 'Academic faculty is created successfully',
      data: result
    })
   } catch (error) {
     next(error)
   }
  };


  const getAllAcademicFacultiesFromDB:RequestHandler = async(req, res, next)=>{
    try {
      const result = await createAcademicFacultyServices.getAllAcademicFacultiesFromDB()
      res.status(200).json({
       success: true,
       message: 'All academic faculties are retrieved successfully',
       data: result
      })
    } catch (error) {
      next(error)
    }
  };

  const getSingleAcademicFacultyFromDB:RequestHandler = async(req, res, next)=>{
     try {
     const {facultyId} = req.params
     const result = await createAcademicFacultyServices.getSingleAcademicFacultyFromDB(facultyId)
     res.status(200).json({
      success: true,
      message: 'Academic faculty is retrieved successfully',
      data: result
     })
     } catch (error) {
      next(error)
     }
  };

  const updateAcademicFacultyIntoDB:RequestHandler =async(req, res, next)=>{
    try {
      const {facultyId} = req.params
    const {academicFaculty} = req.body
    const result = await createAcademicFacultyServices.updateAcademicFacultyIntoDB(facultyId,academicFaculty)
    res.status(200).json({
      success: true,
      message: 'Academic faculty is update successfully',
      data: result
    })
    } catch (error) {
      next(error)
    }
  };

  export const academicFacultyControllers = {
    createAcademicFacultyIntoDB,
    getAllAcademicFacultiesFromDB,
    getSingleAcademicFacultyFromDB,
    updateAcademicFacultyIntoDB
  };