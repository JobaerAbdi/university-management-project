import { Student } from './student.model';

const getAllStudentsFromDB = async () => {
  const result = await Student.find().populate('admissionSemester');
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findById(id).populate('admissionSemester');
  return result;
};

export const studentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
