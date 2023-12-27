
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicFacultyValidations } from './academicFaculty.validation';
import { academicFacultyControllers } from './academicFaculty.controller';

const router = express.Router();
router.post('/create-academicFaculty',
validateRequest(academicFacultyValidations.createAcademicFacultyValidationSchema),
academicFacultyControllers.createAcademicFacultyIntoDB)

export const academicFacultyRoutes = router;
