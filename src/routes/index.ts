import express from 'express';
import { studentRoutes } from '../modules/student/student.route';
import { userRoutes } from '../modules/user/user.route';
import { admissionSemesterRoutes } from '../modules/admissionSemester/admissionSemester.route';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { academicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { facultyRoutes } from '../modules/faculty/faculty.route';
import { adminRoutes } from '../modules/admin/admin.route';
import { courseRoutes } from '../modules/course/course.route';

const router = express.Router();

const moduleRoute = [
    {
        path: '/students',
        route: studentRoutes
    },
    {
        path: '/users', 
        route: userRoutes
    },
    {
        path: '/admissionSemesters',
        route: admissionSemesterRoutes
    },
    {
        path: '/academicFaculty', 
        route: academicFacultyRoutes
    },
    {
        path: '/academicDepartments',
        route: academicDepartmentRoutes
    },
    {
        path: '/faculties',
        route: facultyRoutes
    },
    {
        path: '/admins',
        route: adminRoutes
    },
    {
        path: '/courses',
        route: courseRoutes
    }
];

moduleRoute.forEach(singleRoute=> router.use(singleRoute.path, singleRoute.route))

export default router;