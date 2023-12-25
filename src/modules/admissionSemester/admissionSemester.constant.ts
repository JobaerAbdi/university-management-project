import { TAdmissionSemesterCode, TAdmissionSemesterMonths, TAdmissionSemesterName, TAdmissionSemesterNameCodeMapper } from "./admissionSemester.interface";

export const names: TAdmissionSemesterName[] = ['Autumn', 'Summer' ,'Fall'];
  
export const codes: TAdmissionSemesterCode[] = ['01', '02', '03'];

export const months: TAdmissionSemesterMonths[] =  [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
];


export const admissionSemesterNameCodeMapper:TAdmissionSemesterNameCodeMapper = {
    Autumn : '01',
    Summer : '02',
    Fall : '03'
  };

 