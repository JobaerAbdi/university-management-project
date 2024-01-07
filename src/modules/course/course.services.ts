import { TCourse } from "./course.interface";
import { Course } from "./course.model"

const createCourseIntoDB = async(payload: TCourse)=>{
    const result = await Course.create(payload)
    return result
};

const getAllCourseFromDB = async()=>{
    const result = await Course.find()
    return result
};

const getSingleCourseFromDB = async(id: string)=>{
    const result = await Course.findById(id)
    return result
};
/*
const updateCourseIntoDB = async(id: string, payload: Partial<TCourse>)=>{
    const result = await Course.findByIdAndUpdate(
        id,
        {payload},
        {new: true, runValidators: true}
    )
    return result
};
*/
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
    // updateCourseIntoDB
    deleteCourseFromDB
};