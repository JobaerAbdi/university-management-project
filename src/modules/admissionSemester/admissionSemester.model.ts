import { Schema, model } from 'mongoose';
import { codes, months, names } from './admissionSemester.constant';
import { TAdmissionSemester } from './admissionSemester.interface';

export const admissionSemesterSchema = new Schema<TAdmissionSemester>(
  {
    name: {
      type: String,
      enum: names,
      required: true,
    },
    code: {
      type: String,
      enum: codes,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      enum: months,
      required: true,
    },
    endMonth: {
      type: String,
      enum: months,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);


admissionSemesterSchema.pre('save', async function(next){
  const isAdmissionSemesterExists = await AdmissionSemester.findOne({
    name: this.name,
    year: this.year
  })
  
  if(isAdmissionSemesterExists){
    throw new Error("Admission semester is already exists!")
  }
  next()
});


export const AdmissionSemester = model<TAdmissionSemester>(
  'AdmissionSemester',
  admissionSemesterSchema,
);
