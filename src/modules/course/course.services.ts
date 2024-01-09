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
    const {preRequisiteCourses, ...basicCourseData} = payload
    const updateBasicCourseData = await Course.findByIdAndUpdate(
        id,
        basicCourseData,
        {new: true, runValidators: true}
    )
    if(preRequisiteCourses && preRequisiteCourses?.length > 0){
        const deletePreRequisites = preRequisiteCourses.filter(element=> element.course && element.isDeleted)
        const deletePreRequisitesId = deletePreRequisites.map(ele=> ele.course)
        await Course.findByIdAndUpdate(
            id,
            {
                $pull: {
                    preRequisiteCourses: {
                        course: {
                            $in: deletePreRequisitesId
                            
                        }
                    }
                }
            }
        )
    }
    return updateBasicCourseData

}



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