import mongoose from 'mongoose';
import { User } from '../user/user.model';
import { Student } from './student.model';
import { string } from 'zod';

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate('user')
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findById(id)
    .populate('user')
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

// ==================================================================
/*
const deleteStudentFromDB = async (id: string) => {
    const deletedStudent = await Student.updateOne(
      {id},
      { isDeleted: true },
    );
    return deletedStudent;
};
*/

//==============================================================================

const deleteStudentFromDB = async(id: string)=>{
  const session = await mongoose.startSession();
   try {
    session.startTransaction();
    const deleteStudent = await Student.findOneAndUpdate(
      {id},
      {isDeleted: true},
      {new: true, session}
    )
    if(!deleteStudent){
      throw new Error('Failed to delete student')
    }
    const deleteUser = await User.findOneAndUpdate(
      {id},
      {isDeleted: true},
      {new: true, session}
    )
    if(!deleteUser){
      throw new Error('Failed to delete user')
    }
    await session.commitTransaction();
    await session.endSession();
   } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete student')
   }
}

export const studentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
