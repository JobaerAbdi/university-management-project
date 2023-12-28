import express from 'express';
import { academicDepartmentControllers } from './academicDepartment.controller';

const router = express.Router();

router.post('/create-academicDepartment', academicDepartmentControllers.createAcademicDepartmentIntoDB)

export const academicDepartmentRoutes = router;