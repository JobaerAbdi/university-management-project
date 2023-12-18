import { Request, Response } from "express";
import { studentServices } from "./student.service";

const createStudentIntoDB = async(req: Request,res: Response)=>{
  try {
    const {student} = req.body
    const result = await studentServices.createStudentIntoDB(student)
    res.status(201).json({
        success: true,
        messages: 'Student created successfully',
        data: result,
    })
  } catch (error) {
    res.status(500).json({
        success : false,
        messages : 'Student not found',
        error: {
            code: 400,
            description: 'Student not found'
        }
    })
  }
};

export const studentControllers = {
    createStudentIntoDB,
};