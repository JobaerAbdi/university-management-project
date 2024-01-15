import { AdmissionSemester } from "../admissionSemester/admissionSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";

const createSemesterRegistrationIntoDB = async(payload: TSemesterRegistration)=>{
    const academicSemester = payload?.academicSemester
    const isAcademicSemesterExists = await AdmissionSemester.findById(academicSemester)
    if(!isAcademicSemesterExists){
        throw new Error('Academic semester not found')
    }
};

export const semesterRegistrationServices = {
    createSemesterRegistrationIntoDB,
};