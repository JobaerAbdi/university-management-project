import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {

    const userData: Partial<TUser> = {};

    userData.id = '2030010009';
    userData.password = password || (config.default_password as string); 
    userData.role = 'student';

    const newUser = await User.create(userData);   // => built in static method
    // console.log(newUser);
    
    
     if(Object.keys(newUser).length){
        studentData.id = newUser.id; // embedding id
        studentData.user = newUser._id; // referencing id

        const newStudent = await Student.create(studentData)
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