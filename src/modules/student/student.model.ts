import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    //required: true,
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const bloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const studentSchema = new Schema<TStudent>(
  {
    id: {
      type: String,
      required: [true, 'Id is required'],
      unique: true
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      ref: 'User'
    },
    name: {
      type: userNameSchema,
      require: true
    },
    dateOfBirth: {
      type: String,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    email: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: bloodGroup,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    guardian: {
      type: guardianSchema,
      required: true
    },
    localGuardian: {
      type: localGuardianSchema,
      required: true
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      required: [true, "Admission semester is required"],
      ref: "AdmissionSemester",
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: [true, "Academic department is required"],
      ref: 'AcademicDepartment'
    },
    profileImage: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  },
);


export const Student = model<TStudent>('Student', studentSchema);
