import { Schema } from "mongoose";
import { TFaculty, TName } from "./faculty.interface";

const facultyNameSchema = new Schema<TName>({
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
});

const facultySchema = new Schema<TFaculty>({
   id: {
    type: String,
    required: true,
    unique: true
   },
   user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User is required'],
    ref: 'User'
   },
   name: {
    type: facultyNameSchema,
    required: true
   },
   gender: {
    type: String,
    enum: ['male', 'female'],
    required: true
   },
   dateOfBirth: {
    type: String,
    required: true
   },
   email: {
    type: String,
    required: true
   },
   contactNo: {
    type: String,
    required: true
   },
   emergencyContactNo: {
    type: String,
    required: true
   },
   presentAddress: {
    type: String,
    required: true
   },
   permanentAddress: {
    type: String,
    required: true
   },
   academicDepartment: {
    type: Schema.Types.ObjectId,
    required: [true, 'Academic department is required'],
    ref: 'AcademicDepartment'
   },
   academicFaculty: {
    type: Schema.Types.ObjectId,
    required: [true, 'Academic faculty is required'],
    ref: 'AcademicFaculty'
   },
   designation: {
    type: String,
    required: true
   },
   profileImage: {
    type: String,
    required: true
   },
   isDeleted: {
    type: Boolean,
    default: false
   }
},
{
    timestamps: true
});