import { RequestHandler } from 'express';
import { semesterRegistrationServices } from './semesterRegistration.service';

const createSemesterRegistration: RequestHandler = async (req, res, next) => {
  try {
    const { semesterRegistration } = req.body;
    const result = await semesterRegistrationServices.createSemesterRegistrationIntoDB(semesterRegistration);
    res.status(200).json({
      success: true,
      message: 'Semester registration is successful',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllSemesterRegistration: RequestHandler = async (req, res, next) => {
  try {
    const query = req.query
    const result = await semesterRegistrationServices.getAllSemesterRegistrationFromDB(query);
    res.status(200).json({
      success: true,
      message: 'All semester Registration retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getSingleSemesterRegistration: RequestHandler = async (req,res,next) => {
  try {
    const { registrationId } = req.params;
    const result =
      await semesterRegistrationServices.getSingleSemesterRegistrationFromDB(
        registrationId,
      );
    res.status(200).json({
      success: true,
      message: 'Single SemesterRegistration is retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err)
  }
};


const updateSemesterRegistrationIntoDB: RequestHandler = async(req,res,next)=>{
  try {
    const {registrationId} = req.params
  const {semesterRegistration} = req.body
  const result = await semesterRegistrationServices.updateSemesterRegistrationIntoDB(registrationId, semesterRegistration)
  res.status(200).json({
    success: true,
    message: 'Semester Registration updated successfully',
    data: result
  })
  } catch (err) {
    next(err)
  }
}


export const semesterRegistrationControllers = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistrationIntoDB
};
