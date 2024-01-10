import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { courseSearchableFields } from "./course.constant";
import { TCourse } from "./course.interface";
import { Course } from "./course.model"

const createCourseIntoDB = async(payload: TCourse)=>{
    const result = await Course.create(payload)
    return result
};

const getAllCourseFromDB = async(query: Record<string, unknown>)=>{
    const courseQuery = new QueryBuilder( Course.find().populate('preRequisiteCourses.course'), query )
    .search(courseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()
    const result = await courseQuery.modelQuery
    return result
};

const getSingleCourseFromDB = async(id: string)=>{
    const result = await Course.findById(id).populate('preRequisiteCourses.course')
    return result
};

const updateCourseIntoDB = async(id: string, payload: Partial<TCourse>)=>{
    const {preRequisiteCourses, ...remainingCourseData} = payload;
    const session = await mongoose.startSession();
    try {
        session.startTransaction()
        const updateBasicCourseData = await Course.findByIdAndUpdate(
        id,
        remainingCourseData,
        {
            new: true,
            runValidators: true,
            session
        }
    )
    if(!updateBasicCourseData){
      throw new Error("Failed to update basic course data")
    };

    if(preRequisiteCourses && preRequisiteCourses?.length > 0){
        const findPreRequisiteCourseId = preRequisiteCourses.filter(element=> element.course && element.isDeleted).map(element=> element.course)
        const deletePreRequisiteCourses = await Course.findByIdAndUpdate(
            id,
            {
                $pull: {
                    preRequisiteCourses: {
                        course: {
                            $in: findPreRequisiteCourseId
                        }
                    }
                }
            },
            {
                new: true,
                runValidators: true,
                session
            }
        )
        if(!deletePreRequisiteCourses){
            throw new Error("Failed to delete preRequisiteCourse data")
        };

        const addPreRequisite = preRequisiteCourses.filter(element=> element.course && !element.isDeleted)
        const addPreRequisiteCourses = await Course.findByIdAndUpdate(
            id,
            {
                $addToSet:{
                    preRequisiteCourses: {
                        $each: addPreRequisite
                    }
                }
            },
            {
                new: true,
                runValidators: true,
                session
            }
        )
        if(!addPreRequisiteCourses){
            throw new Error("Failed to add preRequisiteCourses")
        };
    };
    await session.commitTransaction();
    await session.endSession();
    const result = await Course.findById(id).populate('preRequisiteCourses.course')
    return result  
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error("Failed to update course")
    }
};



const deleteCourseFromDB = async(id: string)=>{
    const result = await Course.findByIdAndUpdate(
        id,
        {isDeleted: true},
        {new: true}
    )
    return result
};

export const courseServices = {
    createCourseIntoDB,
    getAllCourseFromDB,
    getSingleCourseFromDB,
    updateCourseIntoDB,
    deleteCourseFromDB
};