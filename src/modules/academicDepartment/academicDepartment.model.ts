import { Schema, model } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";

const academicDepartmentSchema = new Schema<TAcademicDepartment>({
    departmentName: {
        type: String,
        required: true,
        unique: true
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'AcademicFaculty'
    }
},
{
    timestamps: true
}
);

academicDepartmentSchema.pre('save', async function(next){
    const isDepartmentExists = await AcademicDepartment.findOne(
        {departmentName: this.departmentName}
    )
    if(isDepartmentExists){
        throw new Error('This department is already exists')
    }
    next()
});
export const AcademicDepartment = model<TAcademicDepartment>('AcademicDepartment', academicDepartmentSchema)

