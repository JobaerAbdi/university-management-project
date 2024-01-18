import { RequestHandler } from "express";
import { offeredCourseServices } from "./offeredCourse.service";

const createOfferedCourse:RequestHandler = async(req,res,next)=>{
    try {
        const {offeredCourse} = req.body
        const result = await offeredCourseServices.createOfferedCourseIntoDB(offeredCourse)
        res.status(200).json({
            success: true,
            message: 'Offered course created successfully',
            data : result
        })
    } catch (err) {
        next(err)
    }
};

