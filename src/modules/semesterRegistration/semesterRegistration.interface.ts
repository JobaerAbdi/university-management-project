import { Types } from "mongoose";

export type TStatusType = 'UPCOMING' | 'ONGOING' | 'ENDED';

export type TSemesterRegistration = {
    academicSemester: Types.ObjectId;
    status: TStatusType;
    startDate: Date;
    endDate: Date;
    minCredit: number;
    maxCredit: number
};