import { admissionSemesterNameCodeMapper } from './admissionSemester.constant';
import { TAdmissionSemester } from './admissionSemester.interface';
import { AdmissionSemester } from './admissionSemester.model';

const createAdmissionSemesterIntoDB = async (payload: TAdmissionSemester) => {
  if(admissionSemesterNameCodeMapper[payload.name] !== payload.code){
    throw new Error("Invalid semester code")
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

export const admissionSemesterServices = {
  createAdmissionSemesterIntoDB,
  getAllAdmissionSemestersFromDB,
  getSingleAdmissionSemesterFromDB,
};