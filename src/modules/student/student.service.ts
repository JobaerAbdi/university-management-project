import mongoose from 'mongoose';
import { User } from '../user/user.model';
import { Student } from './student.model';
import { TStudent } from './student.interface';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };

  let searchTermValue = '';
  if (query?.searchTerm) {
    searchTermValue = query?.searchTerm as string;
  }

  const searchQuery = Student.find({
    $or: ['email', 'name.firstName', 'presentAddress'].map((field) => ({
      [field]: { $regex: searchTermValue, $options: 'i' },
    })),
  });

  const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  excludeFields.forEach((elem) => delete queryObj[elem]);
  // console.log({query}, {queryObj});
  

  const filterQuery = searchQuery
    .find(queryObj)
    .populate('user')
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  let sort = '-createdAt'
  if (query.sort) {
    sort = query.sort as string;
  }
  const sortQuery = filterQuery.sort(sort);
  let limit = 1
  let page = 1
  let skip = 0

  if(query.limit){
    limit = Number(query.limit)
  }

  if(query?.page){
    page=Number(query?.page)
    skip = (page-1)*limit
  }

  const paginateQuery = sortQuery.skip(skip)
  
  const limitQuery = paginateQuery.limit(limit);

  // field limiting
  let fields = '-__v'
  if(query.fields){
    fields = (query.fields as string).split(',').join(' ')
    // console.log({fields});
    
  }

  const fieldQuery = await limitQuery.select(fields)
  return fieldQuery;
};



const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findById(id)
    .populate('user')
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment', // chining and nested populate methods
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name))
      modifiedUpdatedData[`name.${key}`] = value;
  }

  if (guardian && Object.keys(guardian).length) {
    //        [fatherName, 'Robert Doe']
    //        [fatherOccupation, 'Engineer']
    //        [fatherContactNo, '1111111111']
    //        [motherName, 'Alice Doe']
    //        [motherOccupation, 'Doctor']
    //        [motherContactNo, '2222222222']
    for (const [key, value] of Object.entries(guardian))
      modifiedUpdatedData[`guardian.${key}`] = value;
    //                 guardian.fatherName= 'Robert Doe'
    //                 guardian.fatherOccupation= 'Engineer'
    //                 guardian.fatherContactNo= '1111111111'
    //                 guardian.motherName= 'Alice Doe'
    //                 guardian.motherOccupation= 'Doctor'
    //                 guardian.motherContactNo= '2222222222'
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian))
      modifiedUpdatedData[`localGuardian.${key}`] = value;
  }

  // console.log(modifiedUpdatedData);

  const result = await Student.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
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

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new Error('Failed to delete student');
    }
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new Error('Failed to delete user');
    }
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete student');
  }
};

export const studentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDB,
  deleteStudentFromDB,
};
