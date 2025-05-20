const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

// Product Model (same as in index.js)
const Product = mongoose.model("Product", {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    new_price: { type: Number, required: true },
    old_price: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    available: { type: Boolean, default: true },
});

const uploadImage = async (imagePath) => {
    try {
        const result = await cloudinary.uploader.upload(imagePath, {
            folder: 'everearth-products'
        });
        return result.secure_url;
    } catch (error) {
        console.error('Error uploading image:', error);
        return null;
    }
};

const updateProducts = async () => {
    try {
        // Get all products
        const products = await Product.find({});
        
        for (const product of products) {
            // Try to find the image in the assets directory
            const assetsDir = path.join(__dirname, '../../frontend/src/Components/Assets');
            const files = fs.readdirSync(assetsDir);
            
            // Find any file that starts with 'product_' and contains the product ID
            const productFile = files.find(file => 
                file.startsWith('p' + product.id + '_img') || 
                file.startsWith('product_' + product.id)
            );
            
            if (productFile) {
                const imagePath = path.join(assetsDir, productFile);
                // Upload to Cloudinary
                const cloudinaryUrl = await uploadImage(imagePath);
                if (cloudinaryUrl) {
                    // Update product with Cloudinary URL
                    await Product.findByIdAndUpdate(product._id, {
                        image: cloudinaryUrl
                    });
                    console.log(`Updated product ${product.name} with Cloudinary URL`);
                }
            } else {
                console.log(`No matching image found for product ${product.name} (ID: ${product.id})`);
            }
        }
        
        console.log('All products updated successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error updating products:', error);
        process.exit(1);
    }
};

updateProducts();
