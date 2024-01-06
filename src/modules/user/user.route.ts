import { studentValidations } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';
import express from 'express';
import { userControllers } from './user.controller';
import { facultyValidations } from '../faculty/faculty.validation';
import { AdminValidations } from '../admin/admin.validation';
const router = express.Router();

router.post('/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  userControllers.createStudentIntoDB,
);


router.post('/create-faculty',
validateRequest(facultyValidations.createFacultyValidationSchema),
userControllers.createFaculty);


router.post('/create-admin',
validateRequest(AdminValidations.createAdminValidationSchema),
userControllers.createAdmin);

export const userRoutes = router;