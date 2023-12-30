import { z } from 'zod';

const createUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(255),
  middleName: z.string().min(1).max(255).optional(),
  lastName: z.string().min(1).max(255),
});

const createGuardianValidationSchema = z.object({
  fatherName: z.string().min(1).max(255),
  fatherOccupation: z.string().min(1).max(255),
  fatherContactNo: z.string().min(1).max(20),
  motherName: z.string().min(1).max(255),
  motherOccupation: z.string().min(1).max(255),
  motherContactNo: z.string().min(1).max(20),
});

const createLocalGuardianValidationSchema = z.object({
  name: z.string().min(1).max(255),
  occupation: z.string().min(1).max(255),
  contactNo: z.string().min(1).max(20),
  address: z.string().min(1).max(500),
});


const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    studentData: z.object({
      name: createUserNameValidationSchema,
      dateOfBirth: z.string().optional(),
      gender: z.enum(['male', 'female']).optional(),
      email: z.string().email(),
      contactNo: z.string().min(1).max(20),
      emergencyContactNo: z.string().min(1).max(20),
      bloodGroup:z.enum([ 'A+','A-','B+','B-','AB+','AB-','O+','O-']).optional(),
      presentAddress: z.string().min(1).max(500),
      permanentAddress: z.string().min(1).max(500),
      guardian: createGuardianValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,
      admissionSemester: z.string(),
      academicDepartment: z.string(),
      profileImage: z.string().optional(),
    }),
  }),
});




//         update site
const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(255).optional(),
  middleName: z.string().min(1).max(255).optional(),
  lastName: z.string().min(1).max(255).optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().min(1).max(255).optional(),
  fatherOccupation: z.string().min(1).max(255).optional(),
  fatherContactNo: z.string().min(1).max(20).optional(),
  motherName: z.string().min(1).max(255).optional(),
  motherOccupation: z.string().min(1).max(255).optional(),
  motherContactNo: z.string().min(1).max(20).optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  occupation: z.string().min(1).max(255).optional(),
  contactNo: z.string().min(1).max(20).optional(),
  address: z.string().min(1).max(500).optional(),
});

const updateStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    studentData: z.object({
      name: updateUserNameValidationSchema.optional(),
      dateOfBirth: z.string().optional(),
      gender: z.enum(['male', 'female']).optional(),
      email: z.string().email().optional(),
      contactNo: z.string().min(1).max(20).optional(),
      emergencyContactNo: z.string().min(1).max(20).optional(),
      bloodGroup:z.enum([ 'A+','A-','B+','B-','AB+','AB-','O+','O-']).optional(),
      presentAddress: z.string().min(1).max(500).optional(),
      permanentAddress: z.string().min(1).max(500).optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
      profileImage: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema
};
