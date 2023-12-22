import express from 'express';
import { studentRoutes } from '../modules/student/student.route';
import { userRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRoute = [
    {path: '/students', route: studentRoutes},
    {path: '/users', route: userRoutes}
];

moduleRoute.forEach(singleRoute=> router.use(singleRoute.path, singleRoute.route))

export default router;