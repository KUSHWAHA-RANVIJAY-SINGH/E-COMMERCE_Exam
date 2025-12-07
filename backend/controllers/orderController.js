import Order from '../models/Order.js';
import OrderItem from '../models/OrderItem.js';
import { mysqlPool } from '../config/db.js';

export const createOrder = async (req, res) => {
         const { items } = req.body;

         // Validate user is authenticated
         if (!req.user) {
                  return res.status(401).json({ error: 'Unauthorized' });
         }

         if (!items || items.length === 0) {
                  return res.status(400).json({ error: 'No items in order' });
         }

         try {
                  // Calculate total on server (EXAM REQUIREMENT)
                  const total = items.reduce((sum, item) => {
                           return sum + (item.priceAtPurchase * item.quantity);
                  }, 0);

                  // Create order in MySQL
                  const [orderResult] = await mysqlPool.execute(
                           'INSERT INTO orders (userId, total, createdAt) VALUES (?, ?, NOW())',
                           [req.user.id, total]
                  );

                  const orderId = orderResult.insertId;

                  // Create order items
                  for (const item of items) {
                           await mysqlPool.execute(
                                    'INSERT INTO order_items (orderId, productId, quantity, priceAtPurchase) VALUES (?, ?, ?, ?)',
                                    [orderId, item.productId, item.quantity, item.priceAtPurchase]
                           );
                  }

                  res.status(201).json({
                           message: 'Order created successfully',
                           orderId,
                           total
                  });
         } catch (err) {
                  console.error('Order creation error:', err);
                  res.status(500).json({ error: 'Failed to create order' });
         }
};

export const getOrders = async (req, res) => {
         if (!req.user) {
                  return res.status(401).json({ error: 'Unauthorized' });
         }

         try {
                  const [orders] = await mysqlPool.execute(
                           'SELECT * FROM orders WHERE userId = ? ORDER BY createdAt DESC',
                           [req.user.id]
                  );

                  res.json({ orders });
         } catch (err) {
                  console.error('Get orders error:', err);
                  res.status(500).json({ error: 'Failed to fetch orders' });
         }
};
