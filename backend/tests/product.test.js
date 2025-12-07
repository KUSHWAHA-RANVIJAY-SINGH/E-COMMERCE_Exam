import request from 'supertest';
import { jest } from '@jest/globals';
import express from 'express';
const mockProduct = {
         find: jest.fn().mockReturnThis(),
         sort: jest.fn().mockReturnThis(),
         limit: jest.fn().mockReturnThis(),
         skip: jest.fn().mockReturnThis(),
         countDocuments: jest.fn().mockResolvedValue(10),
         exec: jest.fn().mockResolvedValue([])
};

// Mock the model before importing the controller
jest.unstable_mockModule('../models/Product.js', () => ({
         default: mockProduct,
}));

let getProducts;

beforeAll(async () => {
         // Dynamic import ensures the mock is used
         const productController = await import('../controllers/productController.js');
         getProducts = productController.getProducts;
});

describe('Product Sorting Test', () => {
         // Reset mocks before each test to clear previous call history
         beforeEach(() => {
                  jest.clearAllMocks();
         });

         it('should sort by price descending by default', async () => {
                  const app = express();
                  app.get('/products', getProducts);

                  await request(app).get('/products');

                  expect(mockProduct.sort).toHaveBeenCalledWith({ price: -1 });
         });

         it('should sort by price ascending if header is present', async () => {
                  const app = express();
                  app.get('/products', getProducts);

                  await request(app).get('/products').set('X-Sort-Order', 'asc');

                  expect(mockProduct.sort).toHaveBeenCalledWith({ price: 1 });
         });
});