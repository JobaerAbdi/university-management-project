import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

const createAcademicFacultyIntoDB = async(payload: TAcademicFaculty)=>{
    /*
    const isFacultyExists = await AcademicFaculty.findOne(
        {facultyName: payload.facultyName}
    )
    console.log(isFacultyExists);
    
    if(isFacultyExists){
        throw new Error('This faculty is already exists')
    }
    */
   
    const result = await AcademicFaculty.create(payload)
    return result
};

const getAllAcademicFacultiesFromDB = async()=>{
    const result = await AcademicFaculty.find()
    return result
};

const getSingleAcademicFacultyFromDB = async(id: string)=>{
    const result = await AcademicFaculty.findById(id)
    return result
};

const updateAcademicFacultyIntoDB = async(id:string, payload: Partial<TAcademicFaculty>)=>{
    const result = await AcademicFaculty.findByIdAndUpdate(
       id,
       payload,
       {new: true, runValidators: true}
    )
    return result
};

export const createAcademicFacultyServices = {
    createAcademicFacultyIntoDB,
    getAllAcademicFacultiesFromDB,
    getSingleAcademicFacultyFromDB,
    updateAcademicFacultyIntoDB
};