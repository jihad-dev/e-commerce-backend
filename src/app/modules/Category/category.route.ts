import express from 'express';
import { CategoryControllers } from './category.controller';

import { CategoryValidation } from './category.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';

const router = express.Router();

// Create a new category
router.post('/', auth(['admin', 'superAdmin']), validateRequest(CategoryValidation.createCategoryZodSchema), CategoryControllers.createCategory);

// Get all categories
router.get('/', CategoryControllers.getAllCategories);

// Get a single category by ID
router.get('/:categoryId', CategoryControllers.getSingleCategory);

// Update a category by ID
router.put('/:categoryId', auth(['admin', 'superAdmin']), validateRequest(CategoryValidation.updateCategoryZodSchema), CategoryControllers.updateCategory);

// Delete a category by ID
router.delete('/:categoryId', auth(['admin', 'superAdmin']), CategoryControllers.deleteCategory);

export const CategoryRoutes = router; 