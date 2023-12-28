
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicFacultyValidations } from './academicFaculty.validation';
import { academicFacultyControllers } from './academicFaculty.controller';

const router = express.Router();

router.post('/create-academicFaculty',
validateRequest(academicFacultyValidations.createAcademicFacultyValidationSchema),
academicFacultyControllers.createAcademicFacultyIntoDB)

router.get('/', academicFacultyControllers.getAllAcademicFacultiesFromDB)

router.get('/:facultyId', academicFacultyControllers.getSingleAcademicFacultyFromDB)

router.patch('/:facultyId',
validateRequest(academicFacultyValidations.updateAcademicFacultyValidationSchema),
academicFacultyControllers.updateAcademicFacultyIntoDB)

export const academicFacultyRoutes = router;
