export type TAdmissionSemesterName = 'Autumn'| 'Summer' | 'Fall';
export type TAdmissionSemesterCode = '01' | '02' | '03';

export type TAdmissionSemesterMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';



export type TAdmissionSemester = {
    name: TAdmissionSemesterName;
    code: TAdmissionSemesterCode;
    year: string;
    startMonth: TAdmissionSemesterMonths;
    endMonth: TAdmissionSemesterMonths
};

export type TAdmissionSemesterNameCodeMapper = {
  [key: string]: string;
};