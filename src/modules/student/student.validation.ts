import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z.string().min(1).max(255),
  middleName: z.string().min(1).max(255).optional(),
  lastName: z.string().min(1).max(255),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().min(1).max(255),
  fatherOccupation: z.string().min(1).max(255),
  fatherContactNo: z.string().min(1).max(20),
  motherName: z.string().min(1).max(255),
  motherOccupation: z.string().min(1).max(255),
  motherContactNo: z.string().min(1).max(20),
});

const localGuardianValidationSchema = z.object({
  name: z.string().min(1).max(255),
  occupation: z.string().min(1).max(255),
  contactNo: z.string().min(1).max(20),
  address: z.string().min(1).max(500),
});

const bloodGroupSchema = z.enum([
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
]);

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    studentData: z.object({
      name: userNameValidationSchema,
      dateOfBirth: z.string().optional(),
      gender: z.enum(['male', 'female']).optional(),
      email: z.string().email(),
      contactNo: z.string().min(1).max(20),
      emergencyContactNo: z.string().min(1).max(20),
      bloodGroup: bloodGroupSchema.optional(),
      presentAddress: z.string().min(1).max(500),
      permanentAddress: z.string().min(1).max(500),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      admissionSemester: z.string(),
      academicDepartment: z.string(),
      profileImage: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
};
