import { RequestHandler } from "express";
import { semesterRegistrationServices } from "./semesterRegistration.service";

const createSemesterRegistration: RequestHandler = async(req,res,next)=>{
    try {
        const {academicSemester} = req.body
    const  result = await semesterRegistrationServices.createSemesterRegistrationIntoDB(academicSemester)
    res.status(200).json({
        success: true,
        message: 'Semester registration is successful',
        data: result
    })
    } catch (err) {
        next(err)
    }
};

export const semesterRegistrationControllers = {
    createSemesterRegistration,
};