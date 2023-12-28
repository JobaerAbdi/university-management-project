import { z } from "zod";

const createAcademicDepartmentValidationSchema = z.object({
    body: z.object({
        academicDepartment: z.object({
            departmentName: z.string({
                invalid_type_error: "Department name must be a string",
            }),
            academicFaculty: z.string({
                invalid_type_error: "Academic faculty must be a string",
            })
        })
    })
});


const updateAcademicDepartmentValidationSchema = z.object({
    body: z.object({
        academicDepartment: z.object({
            departmentName: z.string({
                invalid_type_error: "Department name must be a string",
            }).optional(),
            academicFaculty: z.string({
                invalid_type_error: "Academic faculty must be a string",
            }).optional()
        })
    })
});

export const academicDepartmentValidation  = {
    createAcademicDepartmentValidationSchema,
    updateAcademicDepartmentValidationSchema
};