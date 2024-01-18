import { z } from "zod";
import { days } from "./offeredCourse.constant";

export const createOfferedCourseSchemaValidation = z.object({
    body: z.object({
        offeredCourse: z.object({
            semesterRegistration : z.string(),
            admissionSemester: z.string(),
            academicFaculty: z.string(), 
            academicDepartment: z.string(), 
            course: z.string(), 
            faculty: z.string(),
            maxCapacity: z.number(),
            section: z.number(),
            days: z.enum([...days] as [string, ...string[]]),
            startTime: z.string(),
            endTime: z.string()
        })
    })
});

export const updateOfferedCourseSchemaValidation = z.object({
    body: z.object({
        offeredCourse: z.object({ 
            faculty: z.string().optional(),
            maxCapacity: z.number().optional(),
            days: z.enum([...days] as [string, ...string[]]).optional(),
            startTime: z.string().optional(),
            endTime: z.string().optional()
        })
    })
});


export const offeredCourseValidations = {
    createOfferedCourseSchemaValidation,
    updateOfferedCourseSchemaValidation
};