
import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
         try {
                  const { page = 1, limit = 10, search, category } = req.query;

                  // Build Query
                  let query = {};
                  if (search) query.name = { $regex: search, $options: 'i' };
                  if (category) query.category = category;

                  // Sorting Logic (Exam Requirement)
                  // Default: Descending price. 
                  // If header 'X-Sort-Order' is 'asc', sort ascending.
                  let sortOrder = -1; // Descending
                  if (req.headers['x-sort-order'] === 'asc') {
                           sortOrder = 1; // Ascending
                  }

                  // Add timeout to prevent hanging
                  const products = await Product.find(query)
                           .sort({ price: sortOrder })
                           .limit(parseInt(limit))
                           .skip((parseInt(page) - 1) * parseInt(limit))
                           .maxTimeMS(5000) // 5 second timeout
                           .lean(); // Use lean for better performance

                  const total = await Product.countDocuments(query).maxTimeMS(5000);

                  res.json({
                           products,
                           totalPages: Math.ceil(total / limit),
                           currentPage: parseInt(page)
                  });
         } catch (err) {
                  console.error('Get products error:', err);
                  res.status(500).json({ error: err.message || 'Failed to fetch products' });
         }
};

export const createProduct = async (req, res) => {
         try {
                  // Only admin can create product
                  if (!req.user || req.user.role !== 'admin') {
                           return res.status(403).json({ error: 'Forbidden: Admins only' });
                  }
                  const newProduct = new Product(req.body);
                  await newProduct.save();
                  res.status(201).json(newProduct);
         } catch (err) {
                  res.status(500).json({ error: err.message });
         }
};