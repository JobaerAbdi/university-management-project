import { Schema } from "mongoose";
import { TSemesterRegistration } from "./semesterRegistration.interface";

const statusType = ['UPCOMING' ,'ONGOING' ,'ENDED'];

const semesterRegistrationSchema = new Schema<TSemesterRegistration>({
    academicSemester: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'AdmissionSemester'
    },
    status: {
        type: String,
        enum: statusType,
        required: true
    },
    startDate: {
        type: ,
    },
    endDate: {
        type: ,
    },
    minCredit:{
        type: ,
    },
    maxCredit: {
        type: ,
    },
},
{
    timestamps: true,
});