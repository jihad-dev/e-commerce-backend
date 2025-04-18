import express from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

// Route to create a regular user
router.post(
    '/create-user',
    UserController.createUser
);
router.get('/all-user',
    auth(['admin', 'superAdmin']),
    UserController.getAllUser
)
router.delete(
    '/:id',
    auth(['admin', 'superAdmin']),
    UserController.deleteUser);


export const UserRoutes = router;
