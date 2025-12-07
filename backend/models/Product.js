
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
         sku: { type: String, required: true, index: true },
         name: { type: String, required: true },
         description: { type: String }, // Product description
         price: { type: Number, required: true },
         category: { type: String, required: true, index: true },
         image: { type: String }, // URL to product image
         updatedAt: { type: Date, default: Date.now, index: true }
});

const Product = mongoose.model('Product', productSchema);
export default Product;
