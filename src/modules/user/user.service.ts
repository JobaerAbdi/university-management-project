import config from "../../config";
import { AdmissionSemester } from "../admissionSemester/admissionSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";

const createStudentIntoDB = async (password: string, payload: TStudent) => {

    const userData: Partial<TUser> = {};

    const admissionSemester = await AdmissionSemester.findById(payload.admissionSemester)
    // const admissionSemester = await AdmissionSemester.findById(payload.admissionSemester)
    
    
    // userData.id = "2024010001";
    userData.id = await generateStudentId(admissionSemester);
    userData.password = password || (config.default_password as string);
    userData.role = 'student';

    const newUser = await User.create(userData);   // => built in static method
    // console.log(newUser);
    
    
     if(Object.keys(newUser).length){
        payload.id = newUser.id; // embedding id
        payload.user = newUser._id; // referencing id

        const newStudent = await Student.create(payload)
        return newStudent;
     }
    
  /*
    const student = new Student(studentData)
    const result = await student.save()  // => built in instance method
    return result;
  */
  };

  export const userServices = {
    createStudentIntoDB,
  };