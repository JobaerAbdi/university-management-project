import express from 'express';
import { semesterRegistrationControllers } from './semesterRegistration.controller';
import validateRequest from '../../middlewares/validateRequest';
import { semesterRegistrationValidations } from './semesterRegistration.validation';
const router = express.Router()


router.post('/create-semesterRegistration',
validateRequest(semesterRegistrationValidations.createSemesterRegistrationValidationSchema),
semesterRegistrationControllers.createSemesterRegistration);

router.get('/', semesterRegistrationControllers.getAllSemesterRegistration)


export const semesterRegistrationRoutes = router;