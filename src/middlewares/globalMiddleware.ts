/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue } from "zod";
import config from "../config";
import handleZodError from "../errors/handleZodError";
import { TErrorSources } from "../interface/error";
import handleValidationError from "../errors/handleValidationError";

const globalMiddleWare = ((err: any, req: Request, res: Response, next: NextFunction)=>{
    
    let statusCode = 500;
    let message = err.message || 'Something went wrong';

    let errorSource: TErrorSources = [{
        path: '',
        message: 'Something went wrong'
    }]

    if(err instanceof ZodError){
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSource = simplifiedError?.errorSource;        
    }else if(err?.name === 'ValidationError'){
        const simplifiedError = handleValidationError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSource = simplifiedError?.errorSource;
    }
    
    return res.status(statusCode).json({
        success: false,
        message,
        errorSource,
        stack: config.node_env === "development"? err?.stack : null,
    })
});

export default globalMiddleWare;