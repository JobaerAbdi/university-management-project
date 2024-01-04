import { z } from 'zod';


//            create faculty academic validation schema

const createFacultyNameValidationSchema = z.object({
    firstName: z.string({ required_error: 'FirstName is required' }),
    middleName: z.string({ required_error: 'MiddleName is required' }),
    lastName: z.string({ required_error: 'LastName is required' })
});

const createFacultyValidationSchema = z.object({
  body: z.object({
    facultyData: z.object({
      id: z.string({ required_error: 'ID is required' }),
      user: z.string({ required_error: 'User ID is required' }),
      name: createFacultyNameValidationSchema,
      gender: z.enum(['male', 'female'], {
        required_error: 'Gender is required',
      }),
      dateOfBirth: z.string({ required_error: 'Date of birth is required' }),
      email: z.string({ required_error: 'Email is required' }),
      contactNo: z.string({ required_error: 'Contact number is required' }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required',
      }),
      presentAddress: z.string({
        required_error: 'Present address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic department ID is required',
      }),
      academicFaculty: z.string({
        required_error: 'Academic faculty ID is required',
      }),
      designation: z.string({ required_error: 'Designation is required' }),
      profileImage: z.string({
        required_error: 'Profile image URL is required',
      }),
    }),
  }),
});

//======================================================================================

//              update faculty validation schema

const updateFacultyNameValidationSchema = z.object({
    firstName: z.string({ required_error: 'FirstName is required' }).optional(),
    middleName: z.string({ required_error: 'MiddleName is required' }).optional(),
    lastName: z.string({ required_error: 'LastName is required' }).optional()
});

const updateFacultyValidationSchema = z.object({
  body: z.object({
    facultyData: z.object({
      id: z.string({ required_error: 'ID is required' }).optional(),
      user: z.string({ required_error: 'User ID is required' }).optional(),
      name: updateFacultyNameValidationSchema.optional(),
      gender: z.enum(['male', 'female'], {
        required_error: 'Gender is required',
      }).optional(),
      dateOfBirth: z.string({ required_error: 'Date of birth is required' }).optional(),
      email: z.string({ required_error: 'Email is required' }).optional(),
      contactNo: z.string({ required_error: 'Contact number is required' }).optional(),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required',
      }).optional(),
      presentAddress: z.string({
        required_error: 'Present address is required',
      }).optional(),
      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }).optional(),
      academicDepartment: z.string({
        required_error: 'Academic department ID is required',
      }).optional(),
      academicFaculty: z.string({
        required_error: 'Academic faculty ID is required',
      }).optional(),
      designation: z.string({ required_error: 'Designation is required' }),
      profileImage: z.string({
        required_error: 'Profile image URL is required',
      }).optional(),
    }),
  }),
});

export const facultyValidation = {
  createFacultyValidationSchema,
  updateFacultyValidationSchema
};
