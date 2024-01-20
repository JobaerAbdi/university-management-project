import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";

const createOfferedCourseIntoDB = async(payload: TOfferedCourse)=>{
    const {semesterRegistration,  academicFaculty, academicDepartment, course, faculty} = payload

    const isSemesterRegistrationExists = await SemesterRegistration.findById(semesterRegistration)
    if(!isSemesterRegistrationExists){
        throw new Error("Semester registration is not found!")
    }
    
    const isAcademicFacultyExists = await AcademicFaculty.findById(academicFaculty)
    if(!isAcademicFacultyExists){
        throw new Error ("Academic faculty is not found!")
    }

    const isAcademicDepartmentExists = await AcademicDepartment.findById(academicDepartment)
    if(!isAcademicDepartmentExists){
       throw new Error('Academic department is not found!')
    }

    const isCourseExists = await Course.findById(course)
    if(!isCourseExists){
        throw new Error('Course is not found!')
    }

    const isFacultyExists = await Faculty.findById(faculty)
    if(!isFacultyExists){
        throw new Error('Faculty is not found!')
    }
    const result = await OfferedCourse.create(payload)
    return result
};

export const offeredCourseServices = {
    createOfferedCourseIntoDB,
};