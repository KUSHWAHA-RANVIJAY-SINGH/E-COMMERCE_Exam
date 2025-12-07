// Database seed script for E-Commerce application
import mongoose from 'mongoose';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

// Sample products data
const sampleProducts = [
  { sku: 'LAPTOP-001', name: 'Premium Laptop Pro 15', price: 1299.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80' },
  { sku: 'PHONE-001', name: 'Smartphone X Ultra', price: 899.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80' },
  { sku: 'HEADPHONE-001', name: 'Wireless Headphones Premium', price: 199.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { sku: 'WATCH-001', name: 'Smart Watch Series 5', price: 399.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80' },
  { sku: 'TABLET-001', name: 'Tablet Pro 12.9', price: 799.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80' },
  { sku: 'CAMERA-001', name: 'DSLR Camera Professional', price: 1499.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80' },
  { sku: 'SPEAKER-001', name: 'Bluetooth Speaker Max', price: 149.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80' },
  { sku: 'KEYBOARD-001', name: 'Mechanical Keyboard RGB', price: 129.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1587829741301-dc798b91add1?w=500&q=80' },
  { sku: 'MOUSE-001', name: 'Gaming Mouse Pro', price: 79.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80' },
  { sku: 'MONITOR-001', name: '4K Monitor 27 inch', price: 449.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80' },
  { sku: 'SHIRT-001', name: 'Cotton T-Shirt Premium', price: 29.99, category: 'Clothing', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80' },
  { sku: 'JEANS-001', name: 'Denim Jeans Classic', price: 59.99, category: 'Clothing', image: 'https://images.unsplash.com/photo-1542272617-08f086375082?w=500&q=80' },
  { sku: 'SHOES-001', name: 'Running Shoes Pro', price: 89.99, category: 'Clothing', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80' },
  { sku: 'JACKET-001', name: 'Winter Jacket Warm', price: 149.99, category: 'Clothing', image: 'https://images.unsplash.com/photo-1551028919-3012aeb9d3e7?w=500&q=80' },
  { sku: 'BAG-001', name: 'Backpack Travel', price: 69.99, category: 'Accessories', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80' },
  { sku: 'WALLET-001', name: 'Leather Wallet Premium', price: 49.99, category: 'Accessories', image: 'https://images.unsplash.com/photo-1627123424574-181ce90b594f?w=500&q=80' },
  { sku: 'SUNGLASSES-001', name: 'Sunglasses UV Protection', price: 99.99, category: 'Accessories', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80' },
  { sku: 'BOOK-001', name: 'Programming Guide Advanced', price: 39.99, category: 'Books', image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&q=80' },
  { sku: 'BOOK-002', name: 'Design Patterns Explained', price: 44.99, category: 'Books', image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500&q=80' },
  { sku: 'BOOK-003', name: 'Web Development Mastery', price: 49.99, category: 'Books', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80' }
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...\n');

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log(`✅ Inserted ${sampleProducts.length} products into MongoDB\n`);

    // Connect to MySQL
    const mysqlPool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || 'ecommerce_db'
    });

    console.log('✅ Connected to MySQL');

    // Create tables if they don't exist
    await mysqlPool.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        passwordHash VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'customer'
      )
    `);
    console.log('✅ Created/verified users table');

    await mysqlPool.execute(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        total FLOAT NOT NULL,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Created/verified orders table');

    await mysqlPool.execute(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        orderId INT NOT NULL,
        productId VARCHAR(255) NOT NULL,
        quantity INT NOT NULL DEFAULT 1,
        priceAtPurchase FLOAT NOT NULL,
        FOREIGN KEY (orderId) REFERENCES orders(id) ON DELETE CASCADE
      )
    `);
    console.log('✅ Created/verified order_items table');

    // Clear existing users
    await mysqlPool.execute('DELETE FROM users');
    console.log('🗑️  Cleared existing users');

    // Create sample users
    const adminPassword = await bcrypt.hash('admin123', 10);
    const customerPassword = await bcrypt.hash('customer123', 10);

    await mysqlPool.execute(
      'INSERT INTO users (name, email, passwordHash, role) VALUES (?, ?, ?, ?)',
      ['Admin User', 'admin@test.com', adminPassword, 'admin']
    );

    await mysqlPool.execute(
      'INSERT INTO users (name, email, passwordHash, role) VALUES (?, ?, ?, ?)',
      ['John Customer', 'customer@test.com', customerPassword, 'customer']
    );

    console.log('✅ Created sample users:');
    console.log('   📧 Admin: admin@test.com / admin123');
    console.log('   📧 Customer: customer@test.com / customer123\n');

    await mysqlPool.end();
    await mongoose.connection.close();

    console.log('🎉 Database seeding completed successfully!\n');
    console.log('📊 Summary:');
    console.log(`   - Products: ${sampleProducts.length}`);
    console.log('   - Users: 2 (1 admin, 1 customer)');
    console.log('   - Tables: users, orders, order_items\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
}

seedDatabase();
