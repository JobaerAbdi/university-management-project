import { z } from "zod";

const createAcademicFacultyValidationSchema = z.object({
    body: z.object({
        academicFaculty: z.object({
            facultyName: z.string({
                invalid_type_error: "facultyName must be a string",
            })
        })
    })
});



const updateAcademicFacultyValidationSchema = z.object({
    body: z.object({
        academicFaculty: z.object({
            facultyName: z.string({
                invalid_type_error: "facultyName must be a string",
            }).optional()
        })
    })
});

export const academicFacultyValidations = {
  createAcademicFacultyValidationSchema,
  updateAcademicFacultyValidationSchema
};