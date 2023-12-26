import { TAdmissionSemester } from '../admissionSemester/admissionSemester.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    { role: 'student' },
    { id: 1, _id: 0 },
  ).sort(
    {createdAt: -1}
    );
  return lastStudent?.id ? lastStudent.id.substring(6) : 'Undefined';  // 0001
};

// year +  semesterCode + 4 digitNumber

export const generateStudentId = async(payload: TAdmissionSemester) => {
  const currentId = await findLastStudentId()    
  const currentIdNumber = Number(currentId)
  const currentIdNo = currentIdNumber || (0).toString(); 
  //                      0001                  '0'
  let incrementId = (Number(currentIdNo) + 1).toString().padStart(4, '0'); 
  
  
  incrementId = `${payload.admissionYear}${payload.semesterCode}${incrementId}`;
  //                  '2025'                    '01'              '0001';
  return incrementId;
};
