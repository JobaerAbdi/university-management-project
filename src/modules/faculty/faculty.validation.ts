import { z } from 'zod';

const facultyNameValidationSchema = z.object({
    firstName: z.string({ required_error: 'FirstName is required' }),
    middleName: z.string({ required_error: 'MiddleName is required' }),
    lastName: z.string({ required_error: 'LastName is required' })
});

const createFacultyValidationSchema = z.object({
  body: z.object({
    facultyData: z.object({
      id: z.string({ required_error: 'ID is required' }),
      user: z.string({ required_error: 'User ID is required' }),
      name: facultyNameValidationSchema,
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

export const facultyValidation = {
  createFacultyValidationSchema,
};
