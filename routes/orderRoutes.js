const express = require('express');
const { createOrder, getUserOrders, getAllOrders, updateOrderStatus } = require('../controllers/orderController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', authMiddleware, createOrder);
router.get('/:id', authMiddleware, getUserOrders);
router.get('/', authMiddleware, isAdmin, getAllOrders);
router.put('/:id/status', authMiddleware, isAdmin, updateOrderStatus);

module.exports = router;