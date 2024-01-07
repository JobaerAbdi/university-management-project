import { z } from 'zod';

const preRequisiteCourseSchema  = z.object({
    course: z.string().optional()
})

const createCourseValidationSchema = z.object({
  body: z.object({
    courseData: z.object({
      title: z.string({
        required_error: 'Title is required',
        invalid_type_error: 'Title must be a string'
      }),
      prefix: z.string({
        required_error: 'Prefix is required',
        invalid_type_error: 'Prefix must be a string'
      }),
      code: z.number({
        required_error: 'Code is required',
        invalid_type_error: 'Code must be a number'
      }),
      credits: z.number({
        required_error: 'Credits is required',
        invalid_type_error: 'Credits must be a number'
      }),
      preRequisiteCourses: z.array(preRequisiteCourseSchema).optional()
    }),
  }),
});





const updatePreRequisiteCourseSchema  = z.object({
    course: z.string().optional()
})

const updateCourseValidationSchema = z.object({
  body: z.object({
    courseData: z.object({
      title: z.string({
        required_error: 'Title is required',
        invalid_type_error: 'Title must be a string'
      }).optional(),
      prefix: z.string({
        required_error: 'Prefix is required',
        invalid_type_error: 'Prefix must be a string'
      }).optional(),
      code: z.number({
        required_error: 'Code is required',
        invalid_type_error: 'Code must be a number'
      }).optional(),
      credits: z.number({
        required_error: 'Credits is required',
        invalid_type_error: 'Credits must be a number'
      }).optional(),
      preRequisiteCourses: z.array(updatePreRequisiteCourseSchema).optional()
    }),
  }),
});

export const courseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema
};
