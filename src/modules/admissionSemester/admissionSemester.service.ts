import { admissionSemesterNameCodeMapper } from './admissionSemester.constant';
import { TAdmissionSemester } from './admissionSemester.interface';
import { AdmissionSemester } from './admissionSemester.model';

const createAdmissionSemesterIntoDB = async (payload: TAdmissionSemester) => {
  if(payload.semesterName &&
     payload.semesterCode && 
     admissionSemesterNameCodeMapper[payload.semesterName] !== payload.semesterCode){
    throw new Error("Data is not created. Invalid semester code")
  }
  const result = await AdmissionSemester.create(payload)
  return result;
};

const getAllAdmissionSemestersFromDB = async()=>{
  const result = await AdmissionSemester.find()
  return result;
};


const getSingleAdmissionSemesterFromDB = async(id: string)=>{
  const result = await AdmissionSemester.findById(id)
  return result;
};

const updateAdmissionSemesterIntoDB = async(id: string, payload: Partial<TAdmissionSemester>)=>{
  if(payload.semesterName && payload.semesterCode && admissionSemesterNameCodeMapper[payload.semesterName] !== payload.semesterCode){
    throw new Error("Data is not updated. Invalid semester code")
  }
  const result = await AdmissionSemester.findByIdAndUpdate(
    id, 
    payload,
    {new: true, runValidators: true}
  )
  return result;
};

export const admissionSemesterServices = {
  createAdmissionSemesterIntoDB,
  getAllAdmissionSemestersFromDB,
  getSingleAdmissionSemesterFromDB,
  updateAdmissionSemesterIntoDB
};