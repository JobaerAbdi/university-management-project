import { AdmissionSemester } from "../admissionSemester/admissionSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";

const createSemesterRegistrationIntoDB = async(payload: TSemesterRegistration)=>{
    const academicSemester = payload?.academicSemester
    // console.log(academicSemester);

    const isAcademicSemesterExists = await AdmissionSemester.findById(academicSemester)
    // console.log(isAcademicSemesterExists);
    if(!isAcademicSemesterExists){
        throw new Error('Academic semester not found')
    }

    const isSemesterRegistrationExists = await SemesterRegistration.find({academicSemester})
    // console.log(isSemesterRegistrationExists);
    
    if(!isSemesterRegistrationExists){
        throw new Error('Semester registration is already exists')
    }
    const result = await SemesterRegistration.create(payload)
    return result
};


const getAllSemesterRegistrationFromDB = async()=>{
    const result = await SemesterRegistration.find().populate('academicSemester')
    return result
};


export const semesterRegistrationServices = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationFromDB,
};