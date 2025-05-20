require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product'); // Adjust path as needed

async function normalizeCategories() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Get all products
        const products = await Product.find({});
        console.log(`Found ${products.length} products`);

        // Update each product's category to lowercase
        for (const product of products) {
            if (product.category) {
                const normalizedCategory = product.category.toLowerCase();
                if (normalizedCategory !== product.category) {
                    console.log(`Updating category for ${product.name} from ${product.category} to ${normalizedCategory}`);
                    product.category = normalizedCategory;
                    await product.save();
                }
            }
        }

        console.log('All categories normalized successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error normalizing categories:', error);
        process.exit(1);
    }
}

normalizeCategories();
