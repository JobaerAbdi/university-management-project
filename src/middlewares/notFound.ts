/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";


const notFound = ((req:Request, res: Response, next: NextFunction)=>{
    const statusCode = httpStatus.NOT_FOUND;
    const message = 'API not found';
    return res.status(statusCode).json({
        success: false,
        message,
        error: ''
    })
});

export default notFound;