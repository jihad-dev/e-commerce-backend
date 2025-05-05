import express from 'express';
import { OrderControllers } from './order.controller';
const router = express.Router();

router.post('/create-order', OrderControllers.createOrder);
router.get('/', OrderControllers.getOrders);
router.get('/:id', OrderControllers.getOrderById);
router.put('/:id', OrderControllers.updateOrderStatus);
router.delete('/:id', OrderControllers.deleteOrder);

export const OrderRoutes = router; 