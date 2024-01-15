import express from 'express';
import { semesterRegistrationControllers } from './semesterRegistration.controller';
const router = express.Router()


router.post('/create-semesterRegistration', semesterRegistrationControllers.createSemesterRegistration);


export const semesterRegistrationRoutes = router;