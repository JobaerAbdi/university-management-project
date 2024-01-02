import { Schema, model } from "mongoose";
import { TAcademicFaculty } from "./academicFaculty.interface";

const academicFacultySchema = new Schema<TAcademicFaculty>({
    facultyName:{
        type: String,
        required: true,
        unique: true
    }
},
{
    timestamps: true
}
);

// this is document middleware for using document processing before data save into database.
academicFacultySchema.pre('save', async function(next){
    const isFacultyExists = await AcademicFaculty.findOne(
        {facultyName: this.facultyName}
    )
    if(isFacultyExists){
        throw new Error('This department is already exists')
    }
    next()
});


// this is query middleware for using query processing before data save into database.
academicFacultySchema.pre('findOneAndUpdate', async function(next){
    const query = this.getQuery()
    // console.log(query); // _id: '658e2ef8f280ea8c5e3bf859'
    const isFacultyExists = await AcademicFaculty.findOne(query)
    // console.log(isFacultyExists);
    
     if(!isFacultyExists){
        throw new Error('This department does not exists')
     }
    next()
})

export const AcademicFaculty = model<TAcademicFaculty>('AcademicFaculty', academicFacultySchema);