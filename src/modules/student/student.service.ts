import { Student } from './student.model';

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
  .populate('user')
  .populate('admissionSemester')
  .populate('academicDepartment');  // this is chining populate methods.
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findById(id)
  .populate('user')
  .populate('admissionSemester')
  .populate('academicDepartment');  // this is chining populate methods.
  return result;
};


export const studentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
