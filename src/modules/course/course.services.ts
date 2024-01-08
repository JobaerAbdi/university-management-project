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
   const {preRequisiteCourses, ...remainingBasicCourseData} = payload
   console.log(preRequisiteCourses);
   console.log(remainingBasicCourseData);
   const updateBasicCourseData = await Course.findByIdAndUpdate(
    id,
    remainingBasicCourseData
    )
    if(preRequisiteCourses && preRequisiteCourses?.length > 0){
        const deletePreRequisiteCourses = preRequisiteCourses.filter(element=>element.course && element.isDeleted)
        console.log(deletePreRequisiteCourses); 
    }
    return updateBasicCourseData
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