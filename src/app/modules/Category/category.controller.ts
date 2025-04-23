import { Request, Response, NextFunction } from 'express';
import { CategoryServices } from './category.service';

// Basic error handling middleware (you might have a more robust global one)
const catchAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const categoryData = req.body;
  const result = await CategoryServices.createCategoryIntoDB(categoryData);
  res.status(201).json({
    success: true,
    message: 'Category created successfully',
    data: result,
  });
});

const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryServices.getAllCategoriesFromDB();
  res.status(200).json({
    success: true,
    message: 'Categories fetched successfully',
    data: result,
  });
});

const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const result = await CategoryServices.getSingleCategoryFromDB(categoryId);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: 'Category not found',
    });
  }
  res.status(200).json({
    success: true,
    message: 'Category fetched successfully',
    data: result,
  });
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const updateData = req.body;
  const result = await CategoryServices.updateCategoryInDB(categoryId, updateData);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: 'Category not found for update',
    });
  }
  res.status(200).json({
    success: true,
    message: 'Category updated successfully',
    data: result,
  });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const result = await CategoryServices.deleteCategoryFromDB(categoryId);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: 'Category not found for deletion',
    });
  }
  res.status(200).json({
    success: true,
    message: 'Category deleted successfully',
    data: null, // Or optionally return the deleted document `result`
  });
});

export const CategoryControllers = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
}; 