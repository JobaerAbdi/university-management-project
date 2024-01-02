import express from 'express';
import { academicDepartmentControllers } from './academicDepartment.controller';
import validateRequest from '../../middlewares/validateRequest';
import { academicDepartmentValidation } from './academicDepartment.validation';


const router = express.Router();

router.post('/create-academicDepartment', 
validateRequest(academicDepartmentValidation.createAcademicDepartmentValidationSchema),
academicDepartmentControllers.createAcademicDepartmentIntoDB);

router.get('/', academicDepartmentControllers.getAllAcademicDepartmentsFromDB);

router.get('/:departmentId', academicDepartmentControllers.getSingleAcademicDepartmentFromDB);

router.patch('/:departmentId', 
validateRequest(academicDepartmentValidation.updateAcademicDepartmentValidationSchema),
academicDepartmentControllers.updateAcademicDepartmentIntoDB);

export const academicDepartmentRoutes = router;