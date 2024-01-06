// import httpStatus from 'http-status';
// import catchAsync from '../../utils/catchAsync';
// import sendResponse from '../../utils/sendResponse';
// import { FacultyServices } from './faculty.service';

import { RequestHandler } from 'express';
import { FacultyServices } from './faculty.services';

const getSingleFaculty: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await FacultyServices.getSingleFacultyFromDB(id);
    res.status(200).json({
      success: true,
      message: 'Faculty is retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllFaculties: RequestHandler = async (req, res, next) => {
  try {
    const result = await FacultyServices.getAllFacultiesFromDB(req.query);
    res.status(200).json({
      success: true,
      message: 'Faculties are retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateFaculty: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { faculty } = req.body;
    const result = await FacultyServices.updateFacultyIntoDB(id, faculty);
    res.status(200).json({
      success: true,
      message: 'Faculty is updated successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteFaculty: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await FacultyServices.deleteFacultyFromDB(id);
    res.status(200).json({
      success: true,
      message: 'Faculty is deleted successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const FacultyControllers = {
  getAllFaculties,
  getSingleFaculty,
  deleteFaculty,
  updateFaculty,
};
