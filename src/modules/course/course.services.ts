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
    const {preRequisiteCourses, ...remainingData} = payload
    console.log(preRequisiteCourses);
    // [ { course: '659b72e680654fb8287b1aed', isDeleted: true }, { course: '659b754f80654fb8287bf', isDeleted: false } ]
    console.log(remainingData);
    // { title: 'Cascading Cascading Style Sheet', credits: 19 }
    
    const session = await mongoose.startSession();
    try {
        session.startTransaction()
        const updateBasicData = await Course.findByIdAndUpdate(
            id,
            remainingData,
            {
                new: true, 
                runValidators: true, 
                session
            }
        )
        if(!updateBasicData){
            throw new Error("Failed to update  basic data")
        }
    
        if(preRequisiteCourses && preRequisiteCourses?.length > 0){
            const deletePreRequisite = preRequisiteCourses.filter(element=> element.course && element.isDeleted)
            console.log(deletePreRequisite); 
            // [ { course: '659b72e680654fb8287b1aed', isDeleted: true } ]
            const deletePreRequisites = deletePreRequisite.map(element=> element.course)
            console.log(deletePreRequisites); 
            // [ '659b72e680654fb8287b1aed' ]
    
            const deletePreRequisiteCourses = await Course.findByIdAndUpdate(
                id,
                {
                    $pull: {
                        preRequisiteCourses: {
                            course: {
                                $in: deletePreRequisites
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
                throw new Error("Failed to delete PreRequisite course")
            }
    
            const newPreRequisites = preRequisiteCourses.filter(element=>element.course && !element.isDeleted)
            console.log(newPreRequisites)
            // [ { course: '659b754f80654fb8287bf', isDeleted: false } ]
            const newPreRequisiteCourses = await Course.findByIdAndUpdate(
                id,
                {
                    $addToSet: {
                        preRequisiteCourses: {
                            $each: newPreRequisites
                        }
                    }
                },
                {
                    new: true,
                    runValidators: true,
                    session
                }
            )
            if(!newPreRequisiteCourses){
                throw new Error("Failed to update new pre requisite courses")
            }
        }
    
        await session.commitTransaction()
        await session.endSession()
        const result = await Course.findById(id).populate('preRequisiteCourses.course')
        return result;
    } catch (error) {
        await session.abortTransaction()
        await session.endSession()
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