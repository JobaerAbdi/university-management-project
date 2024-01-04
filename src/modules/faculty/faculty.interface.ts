import { Types } from "mongoose";

export type TName = {
    firstName: string;
    middleName: string;
    lastName: string
};

type TGender = 'male' | 'female';

export type TFaculty = {
    id: string;
    user: Types.ObjectId;
    name: TName;
    gender: TGender;
    dateOfBirth: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    presentAddress: string;
    permanentAddress:string;
    academicDepartment: Types.ObjectId;
    academicFaculty: Types.ObjectId;
    designation: string;
    profileImage: string;
    isDeleted: boolean;
};

