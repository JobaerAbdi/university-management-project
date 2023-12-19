import { z } from "zod";

const userNameSchema = z.object({
    firstName: z.string().min(1).max(255),
    middleName: z.string().min(1).max(255).optional(),
    lastName: z.string().min(1).max(255),
  });
  
  const guardianSchema = z.object({
    fatherName: z.string().min(1).max(255),
    fatherOccupation: z.string().min(1).max(255),
    fatherContactNo: z.string().min(1).max(20),
    motherName: z.string().min(1).max(255),
    motherOccupation: z.string().min(1).max(255),
    motherContactNo: z.string().min(1).max(20),
  });
  
  const localGuardianSchema = z.object({
    name: z.string().min(1).max(255),
    occupation: z.string().min(1).max(255),
    contactNo: z.string().min(1).max(20),
    address: z.string().min(1).max(500),
  });
  
  const bloodGroupSchema = z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']);
  
  const studentSchema = z.object({
    id: z.string().min(1).max(255),
    name: userNameSchema,
    dateOfBirth: z.string().optional(),
    gender: z.enum(['male', 'female']).optional(),
    email: z.string().email(),
    contactNo: z.string().min(1).max(20),
    emergencyContactNo: z.string().min(1).max(20),
    bloodGroup: bloodGroupSchema.optional(),
    presentAddress: z.string().min(1).max(500),
    permanentAddress: z.string().min(1).max(500),
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    profileImage: z.string().optional(),
    isActive: z.enum(['active', 'blocked']).default('active'),
  });

  export default studentSchema;