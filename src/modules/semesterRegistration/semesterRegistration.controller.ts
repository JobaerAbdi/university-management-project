import { RequestHandler } from "express";
import { semesterRegistrationServices } from "./semesterRegistration.service";

const createSemesterRegistration: RequestHandler = async(req,res,next)=>{
    try {
        const {semesterRegistration} = req.body
    const  result = await semesterRegistrationServices.createSemesterRegistrationIntoDB(semesterRegistration)
    res.status(200).json({
        success: true,
        message: 'Semester registration is successful',
        data: result
    })
    } catch (err) {
        next(err)
    }
};

const getAllSemesterRegistration: RequestHandler = async(req,res,next)=>{
    try {
        const result = await semesterRegistrationServices.getAllSemesterRegistrationFromDB()
        res.status(200).json({
            success: true,
            message: 'All semester Registration retrieved successfully',
            data: result
        })
    } catch (err) {
        next(err)
    }
};

export const semesterRegistrationControllers = {
    createSemesterRegistration,
    getAllSemesterRegistration,
};