import express from 'express';
import { courseControllers } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import { courseValidations } from './course.validation';

const router = express.Router();

router.post('/create-course', 
validateRequest(courseValidations.createCourseValidationSchema),
courseControllers.createCourse);


export const courseRoutes = router;