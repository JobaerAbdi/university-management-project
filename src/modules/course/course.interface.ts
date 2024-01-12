import { Types } from "mongoose";

// create course route

export type TPreRequisiteCourses= {
    course: Types.ObjectId;
    isDeleted?: boolean
};

export type TCourse = {
    title: string;
    prefix: string;
    code: number;
    credits: number;
    preRequisiteCourses: [TPreRequisiteCourses];
    isDeleted?: boolean;
};

//====================================================================

// Faculties are includes in individual course.

export type TCourseFaculty = {
    course : Types.ObjectId;
    faculties: [Types.ObjectId]
};