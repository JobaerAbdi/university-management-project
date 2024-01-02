import { TErrorSources } from './../interface/error';
import mongoose from 'mongoose';
import { TGenericErrorResponse } from './../interface/TGenericErrorResponse';

const handleMongooseCastError = (err: mongoose.Error.CastError):TGenericErrorResponse =>{
    const errorSource: TErrorSources  = [{
            path: err?.path,
            message: err?.message
       }]
       
    const statusCode = 400
    return {
        statusCode,
        message: 'Mongoose cast error (Invalid ID)',
        errorSource,
    }
}
export default handleMongooseCastError;