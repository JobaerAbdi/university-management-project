import { z } from "zod";
import { codes, months, names } from "./admissionSemester.constant";

const createAdmissionSemesterValidationSchema = z.object({
  body: z.object({
    admissionSemesterData: z.object({
      semesterName: z.enum([...names] as [string, ...string[]]),
      semesterCode: z.enum([...codes] as [string, ...string[]]),
      admissionYear: z.string({
        // required_error: 'Year is required',
        invalid_type_error: 'Year must be a string',
      }),
      startMonth: z.enum([...months] as [string, ...string[]]),
      endMonth: z.enum([...months] as [string, ...string[]])
    })
  })
}); 

const updateAdmissionSemesterValidationSchema = z.object({
  body: z.object({
    admissionSemesterData: z.object({
      semesterName: z.enum([...names] as [string, ...string[]]).optional(),
      semesterCode: z.enum([...codes] as [string, ...string[]]).optional(),
      admissionYear: z.string({
        // required_error: 'Year is required',
        invalid_type_error: 'Year must be a string',
      }).optional(),
      startMonth: z.enum([...months] as [string, ...string[]]).optional(),
      endMonth: z.enum([...months] as [string, ...string[]]).optional()
    })
  })
});

export const academicSemesterValidations = {
  createAdmissionSemesterValidationSchema,
  updateAdmissionSemesterValidationSchema
};