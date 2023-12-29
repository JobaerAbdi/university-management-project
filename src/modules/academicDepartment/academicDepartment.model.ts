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
    // console.log(isDepartmentExists);
    if(isDepartmentExists){
        throw new Error('This department is already exists')
    }
    next()
});

academicDepartmentSchema.pre('findOneAndUpdate', async function(next){
    const query = this.getQuery()
    // console.log(query); // _id: '658d2ec877c039bd0c94542c'
    
    const isDepartmentExists = await AcademicDepartment.findOne(query)
    // console.log(isDepartmentExists); // null
    if(!isDepartmentExists){
        throw new Error('This department does not exists!')
    }
    next()
});

export const AcademicDepartment = model<TAcademicDepartment>('AcademicDepartment', academicDepartmentSchema)

