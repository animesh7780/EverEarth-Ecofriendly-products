const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cors = require("cors");
require("dotenv").config();

const { storage } = require("./config/cloudinary"); // Import from cloudinary.js
const upload = multer({ storage }); // Use cloudinary storage

const port = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

// Default route
app.get("/", (req, res) => {
    res.send("Express app is running");
});

// Image upload route
app.post("/upload", upload.single("product"), (req, res) => {
    res.json({
        success: 1,
        image_url: req.file.path, // Cloudinary gives the secure URL in `path`
    });
});

// Product schema
const productSchema = new mongoose.Schema({
    id: { 
        type: Number, 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    image: { 
        type: String, 
        required: true 
    },
    category: { 
        type: String, 
        required: true 
    },
    new_price: { 
        type: Number, 
        required: true 
    },
    old_price: { 
        type: Number, 
        required: true 
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
    available: { 
        type: Boolean, 
        default: true 
    }
});

const Product = mongoose.model('Product', productSchema);

// Add product route
app.post('/addproduct', upload.single('image'), async (req, res) => {
    try {
        let products = await Product.find({});
        let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

        // Normalize category name to lowercase
        const normalizedCategory = req.body.category.toLowerCase();

        const product = new Product({
            id,
            name: req.body.name,
            image: req.file.path, // Using Cloudinary URL
            category: normalizedCategory,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
        });

        await product.save();
        res.json({ 
            success: true, 
            name: req.body.name,
            image: req.file.path
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get all products
app.get('/allproducts', async (req, res) => {
    try {
        const products = await Product.find({}).sort({ id: 1 });
        
        // Normalize all category names to lowercase
        const normalizedProducts = products.map(product => ({
            ...product.toObject(),
            category: product.category.toLowerCase()
        }));
        
        res.json(normalizedProducts);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get products by category
app.get('/products/:category', async (req, res) => {
    try {
        const category = req.params.category.toLowerCase();
        const products = await Product.find({ 
            category: { $regex: new RegExp('^' + category + '$', 'i') } 
        }).sort({ id: 1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get new collection
app.get('/newcollection', async (req, res) => {
    try {
        const products = await Product.find().sort({ date: -1 }).limit(8);
        res.json(products);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get popular products
app.get('/popular', async (req, res) => {
    try {
        const products = await Product.find({ category: 'toiletries' }).limit(4);
        res.json(products);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Add product route
app.post("/addproduct", async (req, res) => {
    let products = await Product.find({});
    let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

    const product = new Product({
        id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });

    await product.save();
    res.json({ success: true, name: req.body.name });
});

// Remove product route
app.post("/removeproduct", async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    res.json({ success: true, name: req.body.name });
});

// Get all products
app.get("/allproducts", async (req, res) => {
    const products = await Product.find({});
    res.send(products);
});

// User schema
const User = mongoose.model("User", {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    date: { type: Date, default: Date.now },
});

// User signup
app.post("/signup", async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ success: false, errors: "User already exists" });
        }

        const newUser = new User(req.body);
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, "secret_ecom");
        res.json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, errors: "Signup error" });
    }
});

// User login
app.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user || user.password !== req.body.password) {
            return res.status(400).json({ success: false, error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, "secret_ecom");
        res.json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, error: "Login error" });
    }
});

// Product listings
app.get("/newcollection", async (req, res) => {
    const product = await Product.find({});
    const newcollection = product.slice(-8);
    res.send(newcollection);
});

app.get("/popular", async (req, res) => {
    const product = await Product.find({ category: "toiletries" });
    res.send(product.slice(0, 4));
});

app.get("/related", async (req, res) => {
    const product = await Product.find({ category: "greendevices" });
    res.send(product.slice(0, 6));
});

// Auth middleware
const fetchUser = async (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) return res.status(401).send({ errors: "No token provided" });

    try {
        const decoded = jwt.verify(token, "secret_ecom");
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).send({ errors: "Invalid token" });
    }
};

// Cart management
app.post("/addtocart", fetchUser, async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, errors: "User not found" });

    user.cartData[req.body.itemId] = (user.cartData[req.body.itemId] || 0) + 1;
    await user.save();
    res.send("Added to cart successfully");
});

app.post("/removefromcart", fetchUser, async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, errors: "User not found" });

    if (user.cartData[req.body.itemId]) {
        user.cartData[req.body.itemId] -= 1;
        if (user.cartData[req.body.itemId] <= 0) delete user.cartData[req.body.itemId];
    }

    await user.save();
    res.send("Removed from cart successfully");
});

// Start server
app.listen(port, () => {
    console.log("Server running on port " + port);
});
