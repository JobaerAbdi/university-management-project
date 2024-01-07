import { z } from "zod";

const createCourseValidationSchema = z.object({
    body: z.object({
        courseData: z.object({
            title: z.string(),
            prefix: z.string(),
            code: z.number(),
            credits: z.number(),
            preRequisiteCourses:
        })
    })
});

export const courseValidations = {
    createCourseValidationSchema,
};