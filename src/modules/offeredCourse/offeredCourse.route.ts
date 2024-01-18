import express from 'express';
import { offeredCourseControllers } from './offeredCourse.controller';
import validateRequest from '../../middlewares/validateRequest';
import { offeredCourseValidations } from './offeredCourse.validation';
const router = express.Router();

router.post('/create-offeredCourse',
validateRequest(offeredCourseValidations.createOfferedCourseSchemaValidation),
offeredCourseControllers.createOfferedCourse);

export const offeredCourseRoutes = router;