import express from 'express';
import { courseControllers } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import { courseValidations } from './course.validation';

const router = express.Router();

router.post('/create-course', 
validateRequest(courseValidations.createCourseValidationSchema),
courseControllers.createCourse);

router.get('/', courseControllers.getAllCourse);

router.get('/:courseId', courseControllers.getSingleCourse);


router.patch('/:courseId',
validateRequest(courseValidations.updateCourseValidationSchema), 
courseControllers.updateCourse);
//=====================================================================================
router.put('/:courseId/assign-faculties',
validateRequest(courseValidations.courseFacultyValidationSchema),
courseControllers.assignFacultiesWithCourse);

router.delete('/:courseId/remove-faculties',
validateRequest(courseValidations.courseFacultyValidationSchema),
courseControllers.removeFacultiesFromCourse);
//=====================================================================================

router.delete('/:courseId', courseControllers.deleteCourse);


export const courseRoutes = router;