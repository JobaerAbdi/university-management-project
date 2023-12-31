import { TAdmissionSemester } from '../admissionSemester/admissionSemester.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    { role: 'student' },
    { id: 1, _id: 0 },
  ).sort(
    {createdAt: -1}
    );
  return lastStudent?.id ? lastStudent.id : 'Undefined';  
  //       2030 03 0001
};

// year +  semesterCode + 4 digitNumber

export const generateStudentId = async(payload: TAdmissionSemester) => {   // Autumn-01-2030
  /*const currentId = await findLastStudentId()    
  const currentIdNumber = Number(currentId)
  const currentIdNo = currentIdNumber || (0).toString();*/

  let currentIdNo = (0).toString(); 

  const lastStudentId = await findLastStudentId(); //  2030 03 0003

  const lastStudentSemesterYear = lastStudentId?.substring(0,4); // 2030
  const lastStudentSemesterCode = lastStudentId?.substring(4,6); // 03

  const currentStudentSemesterYear = payload.admissionYear; // 2030
  const currentStudentSemesterCode = payload.semesterCode; // 01

  if(lastStudentSemesterYear === currentStudentSemesterYear &&   // 2030 === 2040
     lastStudentSemesterCode === currentStudentSemesterCode){    //   03 === 01
      currentIdNo = lastStudentId.substring(6) // 0002
     }

  let incrementId = (Number(currentIdNo) + 1).toString().padStart(4, '0'); // 0001 by default
  
  
  incrementId = `${payload.admissionYear}${payload.semesterCode}${incrementId}`;
  //                  '2030'                    '01'              '0001';
  return incrementId;
};

//==================================================================================

export const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne(
    {
      role: 'faculty',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async () => {
  let currentId = (0).toString();
  const lastFacultyId = await findLastFacultyId();

  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `F-${incrementId}`;

  return incrementId;
};

//==================================================================================

export const findLastAdminId = async () => {
  const lastAdmin = await User.findOne(
    {
      role: 'admin',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generateAdminId = async () => {
  let currentId = (0).toString();
  const lastAdminId = await findLastAdminId();

  if (lastAdminId) {
    currentId = lastAdminId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `A-${incrementId}`;
  return incrementId;
};
