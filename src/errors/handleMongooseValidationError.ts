import mongoose from 'mongoose';
import { TErrorSources } from '../interface/error';
import { TGenericErrorResponse } from '../interface/TGenericErrorResponse';

const handleMongooseValidationError = (err: mongoose.Error.ValidationError): TGenericErrorResponse => {
    const errorSource: TErrorSources = Object.values(err.errors).map(val=>{
        return {
            path: val?.path,
            message: val?.message
        }
    });

  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorSource,
  };
};

export default handleMongooseValidationError;
