import { userControllers } from './user.controller';
import { studentValidations } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';
import express from 'express';
import { facultyValidations } from '../faculty/faculty.validation';
const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  userControllers.createStudentIntoDB,
);


router.post('/create-faculty',
validateRequest(facultyValidations.createFacultyValidationSchema),
userControllers.createFacultyIntoDB);

export const userRoutes = router;