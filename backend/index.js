const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");
const { error } = require("console");

app.use(express.json());
app.use(cors());

// Database Connection With MongoDB
mongoose.connect("mongodb+srv://animeshkr2003:HOzk7QU4YOjwPNm8@cluster0.v0ey5jy.mongodb.net/e-commerce")

//API creation

app.get("/", (req, res) => {
    res.send("Express app is running")
})

// image storage engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage })

//creating upload endpoint for images

app.use('/images', express.static('upload/images'))

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

// schema for creating products

const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        require: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
})

app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    else {
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success: true,
        name: req.body.name,
    })
})

//creating API for deleting products

app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Remove");
    res.json({
        success: true,
        name: req.body.name,
    })
})

//Creting API for getting all products
app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
})



// Schema for user model
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true // Ensure name is required
    },
    email: {
        type: String,
        unique: true,
        required: true // Ensure email is required
    },
    password: {
        type: String,
        required: true // Ensure password is required
    },
    cartData: {
        type: Object,
        default: {} // Default to an empty object for cartData
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

// Creating endpoint for registering a user
app.post('/signup', async (req, res) => {
    try {
        // Check if a user with the same email already exists
        let existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ success: false, errors: "User with the same email already exists" });
        }

        // Create a new user instance
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password, // Store the hashed password
        });

        // Save the user to the database
        await newUser.save();

        // Generate JWT token for the user
        const token = jwt.sign({ id: newUser.id }, 'secret_ecom');

        // Respond with success and token
        res.json({ success: true, token });
    } catch (error) {
        console.error("Error occurred during signup:", error);
        res.status(500).json({ success: false, errors: "An error occurred during signup" });
    }
});

app.post('/login', async (req, res) => {
    try {
        // Find user by email
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).json({ success: false, error: "Wrong Email Id" });
        }

        // Compare passwords (not recommended without bcrypt)
        if (req.body.password !== user.password) {
            return res.status(400).json({ success: false, error: "Wrong Password" });
        }

        // Generate JWT token for the user
        const token = jwt.sign({ id: user.id }, 'secret_ecom');
        res.json({ success: true, token });
    } catch (error) {
        console.error("Error occurred during login:", error);
        res.status(500).json({ success: false, error: "An error occurred during login" });
    }
});


app.listen(port, (error) => {
    if (!error) {
        console.log("Server running on port " + port)
    }
    else {
        console.log("Error :" + error)
    }
})