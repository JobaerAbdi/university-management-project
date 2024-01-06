import { AdmissionSemester } from '../admissionSemester/admissionSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { generateAdminId, generateFacultyId, generateStudentId } from './user.utils';
import config from '../../config';
import { User } from './user.model';
import { TUser } from './user.interface';
import mongoose, { startSession } from 'mongoose';
import { TFaculty } from '../faculty/faculty.interface';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Faculty } from '../faculty/faculty.model';
import { Admin } from '../admin/admin.model';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const session = await startSession();

  try {
    session.startTransaction();
    const userData: Partial<TUser> = {};
    userData.password = password || (config.default_password as string);
    userData.role = 'student';
    const admissionSemester = await AdmissionSemester.findById(
      payload.admissionSemester,
    );

    userData.id = await generateStudentId(admissionSemester);

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

//================================================================================

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'faculty';

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new Error('Academic department not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new Error('Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new Error('Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
//================================================================================

const createAdminIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'admin';

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); 

    //create a admin
    if (!newUser.length) {
      throw new Error('Failed to create admin');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new Error('Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const userServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB
};

