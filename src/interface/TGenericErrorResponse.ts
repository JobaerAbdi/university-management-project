import { TErrorSources } from "./error";

export type TGenericErrorResponse = {
    statusCode: number;
    message : string;
    errorSource: TErrorSources 
};


  