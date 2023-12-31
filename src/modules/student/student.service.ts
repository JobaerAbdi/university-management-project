import mongoose from 'mongoose';
import { User } from '../user/user.model';
import { Student } from './student.model';
import { TStudent } from './student.interface';

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

const updateStudentIntoDB = async(id: string, payload: Partial<TStudent>)=>{
  const {name, guardian, localGuardian, ...remainingStudentData} = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData
  }

  if(name && Object.keys(name).length){
    for(const [key, value] of Object.entries(name))
    //        [firstName, 'Jakir']                
    //        [middleName, 'hasan']                
    //        [lastName, 'rakib']  
    modifiedUpdatedData[`name.${key}`] = value;    
    //                  name.firstName= 'Jakir'       
    //                  name.middleName= 'hasan'       
    //                  name.lastName= 'rakib'       
  }


  if(guardian && Object.keys(guardian).length){
    for(const [key, value] of Object.entries(guardian))
    //        [fatherName, 'Robert Doe']
    //        [fatherOccupation, 'Engineer']
    //        [fatherContactNo, '1111111111']
    //        [motherName, 'Alice Doe']
    //        [motherOccupation, 'Doctor']
    //        [motherContactNo, '2222222222']
    modifiedUpdatedData[`guardian.${key}`] = value;
    //                 guardian.fatherName= 'Robert Doe'
    //                 guardian.fatherOccupation= 'Engineer'
    //                 guardian.fatherContactNo= '1111111111'
    //                 guardian.motherName= 'Alice Doe'
    //                 guardian.motherOccupation= 'Doctor'
    //                 guardian.motherContactNo= '2222222222'
  }

  if(localGuardian && Object.keys(localGuardian).length){
    for(const [key,value] of Object.entries(localGuardian))
    modifiedUpdatedData[`localGuardian.${key}`] = value
  }
  
  // console.log(modifiedUpdatedData);  

  const result = await Student.findByIdAndUpdate(
    id,
    modifiedUpdatedData,
    {new: true, runValidators:true}
  )
  return result
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
    const deletedStudent = await Student.findOneAndUpdate(
      {id},
      {isDeleted: true},
      {new: true, session}
    )
    if(!deletedStudent){
      throw new Error('Failed to delete student')
    }
    const deletedUser = await User.findOneAndUpdate(
      {id},
      {isDeleted: true},
      {new: true, session}
    )
    if(!deletedUser){
      throw new Error('Failed to delete user')
    }
    await session.commitTransaction();
    await session.endSession();
   } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete student')
   }
};

export const studentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDB,
  deleteStudentFromDB,
};
