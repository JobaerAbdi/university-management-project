import express from 'express';
import { studentControllers } from './student.controller';
const router = express.Router();

router.post('/create-student', studentControllers.createStudentIntoDB);

export const studentRoutes = router;