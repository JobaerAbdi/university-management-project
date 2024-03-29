import QueryBuilder from "../../builder/QueryBuilder";
import { AdmissionSemester } from "../admissionSemester/admissionSemester.model";
import { registration } from "./semesterRegistration.constant";
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
        throw new Error('UPCOMING or ONGOING semester is all ready exists')
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
    const isSemesterRegistrationExists = await SemesterRegistration.findById(id)
    const requestedStatus = payload?.status

    if(!isSemesterRegistrationExists){
        throw new Error('This semester does not exists')
    }
    
    if(isSemesterRegistrationExists?.status === registration.ENDED){
        throw new Error (`This semester is ENDED and it's totally closed`)
    }

    if(isSemesterRegistrationExists?.status === registration.UPCOMING && requestedStatus === registration.ENDED){
        throw new Error (`You can not directly change status from UPCOMING to ENDED`)
    }

    if(isSemesterRegistrationExists?.status === registration.ONGOING && requestedStatus === registration.UPCOMING){
        throw new Error (`You can not directly change status from ONGOING to UPCOMING`)
    }
    
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