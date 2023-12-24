import { TAdmissionSemester } from "./admissionSemester.interface"
import { AdmissionSemester } from "./admissionSemester.model"

const createAdmissionSemesterIntoDB = async(payload: TAdmissionSemester)=>{
    const result = await AdmissionSemester.create(payload);
    return result;
};

export const admissionSemesterServices = {
    createAdmissionSemesterIntoDB,
};