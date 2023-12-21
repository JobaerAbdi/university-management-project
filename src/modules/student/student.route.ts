import express from 'express';
import { studentControllers } from './student.controller';
const router = express.Router();

router.get('/', studentControllers.getAllStudentsFromDB);
router.get('/:studentId', studentControllers.getSingleStudentFromDB);

export const studentRoutes = router;
