import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

// Route to create a regular user
router.post(
    '/create-user',
    UserController.createUser
);

router.get('/',
    UserController.getAllUser
)

router.delete(
    '/:id',
    UserController.deleteUser
);
// Route to create an admin user
router.post(
    '/create-admin',
    UserController.createAdmin
);

router.get(
    '/',
    UserController.getAllAdmin
);

router.delete(
    '/:id',
    UserController.deleteAdmin
);

export const UserRoutes = router;
