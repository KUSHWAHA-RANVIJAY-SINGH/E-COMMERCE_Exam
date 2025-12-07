
import express from 'express';
import { register, login } from '../controllers/authController.js';
import { getProducts, createProduct } from '../controllers/productController.js';
import { createOrder, getOrders } from '../controllers/orderController.js';
import { getReports } from '../controllers/reportController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/products', getProducts);
router.post('/products', authenticateToken, createProduct); // Protected, admin only
router.post('/orders', authenticateToken, createOrder); // Protected, create order
router.get('/orders', authenticateToken, getOrders); // Protected, get user orders
router.get('/reports', authenticateToken, getReports); // Protected, admin reports

export default router;