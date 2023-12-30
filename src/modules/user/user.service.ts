import { startSession } from 'mongoose';
import config from '../../config';
import { AdmissionSemester } from '../admissionSemester/admissionSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  
  const session = await startSession();

  try {
    session.startTransaction();
    const userData: Partial<TUser> = {};
    const admissionSemester = await AdmissionSemester.findById(payload.admissionSemester);
    userData.id = await generateStudentId(admissionSemester);
    userData.password = password || (config.default_password as string);
    userData.role = 'student';

    const newUser = await User.create([userData], { session });
    // console.log(newUser);
    if (!newUser.length) {
      throw new Error('Failed to create student');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newStudent = await Student.create([payload], { session });
    // console.log(newStudent);
    if (!newStudent.length) {
      throw new Error('Failed to create user');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to create student');
  }
};

export const userServices = {
  createStudentIntoDB,
};


 /*
    const student = new Student(studentData)
    const result = await student.save()  // => built in instance method
    return result;
  */

