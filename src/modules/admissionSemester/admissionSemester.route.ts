import express from 'express';
import { admissionSemesterControllers } from './admissionSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterValidations } from './admissionSemester.validation';

const router = express.Router();

router.post('/create-admissionSemester',
 validateRequest(academicSemesterValidations.createAdmissionSemesterValidationSchema),
 admissionSemesterControllers.createAdmissionSemesterIntoDB );

router.get('/', admissionSemesterControllers.getAllAdmissionSemestersFromDB);

export const admissionSemesterRoutes = router;

