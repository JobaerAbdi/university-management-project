import { z } from "zod";
import { codes, months, names } from "./admissionSemester.constant";

const createAdmissionSemesterValidationSchema = z.object({
  body: z.object({
    admissionSemesterData: z.object({
      name: z.enum([...names] as [string, ...string[]]),
      code: z.enum([...codes] as [string, ...string[]]),
      year: z.string({
        // required_error: 'Year is required',
        invalid_type_error: 'Year must be a string',
      }),
      startMonth: z.enum([...months] as [string, ...string[]]),
      endMonth: z.enum([...months] as [string, ...string[]])
    })
  })
});

export const academicSemesterValidations = {
  createAdmissionSemesterValidationSchema,
};