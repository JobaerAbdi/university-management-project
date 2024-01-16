import QueryBuilder from "../../builder/QueryBuilder";
import { AdmissionSemester } from "../admissionSemester/admissionSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";

const createSemesterRegistrationIntoDB = async(payload: TSemesterRegistration)=>{
    const academicSemester = payload?.academicSemester
    // console.log(academicSemester);

    const isUpcomingOrOngoingSemesterExists = await SemesterRegistration.findOne(
        {
            $or: [
                {status: 'UPCOMING'},
                {status: 'ONGOING'}
            ]
        }
    )
    if(isUpcomingOrOngoingSemesterExists){
        throw new Error(`${isUpcomingOrOngoingSemesterExists.status} semester is all ready exists`)
    }
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


const getAllSemesterRegistrationFromDB = async(query: Record<string, unknown>)=>{
    const semesterRegistrationQuery = new QueryBuilder(
        SemesterRegistration.find().populate('academicSemester'), 
        query
    )
    .filter()
    .sort()
    .paginate()
    .fields()
    const result = await semesterRegistrationQuery.modelQuery
    return result
};

const getSingleSemesterRegistrationFromDB = async(id: string)=>{
    const result = await SemesterRegistration.findById(id).populate('academicSemester')
    return result
};

const updateSemesterRegistrationIntoDB = async(id: string, payload: Partial<TSemesterRegistration>)=>{
    const result = await SemesterRegistration.findByIdAndUpdate(
        id,
        payload,
        {
            new: true,
            runValidators: true
        }
    )
    return result
};

export const semesterRegistrationServices = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationFromDB,
    getSingleSemesterRegistrationFromDB,
    updateSemesterRegistrationIntoDB
};