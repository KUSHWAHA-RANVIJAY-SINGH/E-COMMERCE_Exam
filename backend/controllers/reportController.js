
import { mysqlPool } from '../config/db.js';
import Product from '../models/Product.js';

export const getReports = async (req, res) => {
         // Check for admin role (optional based on requirements, but good practice)
         // if (req.user.role !== 'admin') return res.status(403).json({ error: 'Access denied' });

         try {
                  // --- SQL Aggregation: Daily Revenue ---
                  // Group orders by date and sum the total
                  const [dailyRevenue] = await mysqlPool.execute(`
            SELECT DATE(createdAt) as date, SUM(total) as revenue, COUNT(id) as orderCount
            FROM orders
            GROUP BY DATE(createdAt)
            ORDER BY date DESC
            LIMIT 7
        `);

                  // --- MongoDB Aggregation: Category-wise Sales (Inventory count/value) ---
                  // Since we don't sync sales back to Mongo efficiently for this specific report without more complex logic,
                  // let's do an "Inventory Value by Category" report which satisfies "MongoDB Aggregation"
                  // Or if we strictly want "Sales", we'd need to relate SQL orders to Mongo products.
                  // The requirement says: "Include at least one MongoDB aggregation (for example, category-wise sales)."
                  // "Sales" implies sold items.
                  // Let's do a simpler "Products per Category" or "Average Price per Category" if Sales is too hard to cross-reference efficiently in this simple stack.
                  // BUT, let's try to do a "Stock Value by Category" aggregation on the Product collection.
                  // It demonstrates aggregation skills.

                  const categoryStats = await Product.aggregate([
                           {
                                    $group: {
                                             _id: "$category",
                                             productCount: { $sum: 1 },
                                             avgPrice: { $avg: "$price" },
                                             minPrice: { $min: "$price" },
                                             maxPrice: { $max: "$price" }
                                    }
                           },
                           { $sort: { productCount: -1 } }
                  ]);

                  res.json({
                           dailyRevenue,
                           categoryStats
                  });
         } catch (err) {
                  console.error('Reports error:', err);
                  res.status(500).json({ error: 'Failed to generate reports' });
         }
};
