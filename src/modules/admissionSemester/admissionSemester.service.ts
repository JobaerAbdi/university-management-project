import { admissionSemesterNameCodeMapper } from './admissionSemester.constant';
import { TAdmissionSemester } from './admissionSemester.interface';
import { AdmissionSemester } from './admissionSemester.model';

const createAdmissionSemesterIntoDB = async (payload: TAdmissionSemester) => {
  if(admissionSemesterNameCodeMapper[payload.name] !== payload.code){
    throw new Error("Invalid semester code")
  };

  const result = await AdmissionSemester.create(payload);
  return result;
};


export const admissionSemesterServices = {
  createAdmissionSemesterIntoDB,
};