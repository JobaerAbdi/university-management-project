import express from 'express';
import { studentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from './student.validation';
const router = express.Router();

router.get('/', studentControllers.getAllStudentsFromDB);
router.get('/:studentId', studentControllers.getSingleStudentFromDB);
router.patch('/:studentId', 
validateRequest(studentValidations.updateStudentValidationSchema), 
studentControllers.updateStudentIntoDB);
router.delete('/:studentId', studentControllers.deleteStudentFromDB);

export const studentRoutes = router;
