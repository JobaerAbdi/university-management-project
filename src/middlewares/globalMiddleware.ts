/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue } from "zod";
import config from "../config";
import handleZodError from "../errors/handleZodError";
import { TErrorSources } from "../interface/error";
import handleMongooseValidationError from "../errors/handleMongooseValidationError";
import handleMongooseCastError from "../errors/handleMongooseCastError";
import handleDuplicateError from "../errors/handleDuplicateError";

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
        const simplifiedError = handleMongooseValidationError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSource = simplifiedError?.errorSource;
    }else if(err?.name === 'CastError'){
        const simplifiedError = handleMongooseCastError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSource = simplifiedError?.errorSource;
    }
    else if(err?.code === 11000){
        const simplifiedError = handleDuplicateError(err);
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