// FRAMEWORK CONFIGURATION
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDb = require("./config/dbConnection");
const hbs = require("hbs");
const path = require("path");
const fs = require("fs"); // Importing fs to read files from the uploads directory
const userRoutes = require("./routes/userRoutes");
const doctorRoutes = require('./routes/doctorRoutes');
const multer = require("multer");

// Load environment variables from .env file
dotenv.config();

// Initialize express app
const app = express();

// Configure multer for file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Set the view engine
app.set('view engine', 'hbs');

// Connect to the database
connectDb();

// Register partials
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Set the port from environment variables or default to 5000
const port = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware for CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Serve static files from the uploads directory
const uploadDir = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadDir));

// Test route to check if the server is running
app.get('/', (req, res) => {
    res.send("working");
});

// Home route
app.get("/home", (req, res) => {
    const data = {
        title: "document",
        message: "hello world"
    };
    res.render("home", data);
});

// User route
app.get("/user", (req, res) => {
    const users = [
        { id: 1, name: "priyanshu", age: 20 },
        { id: 2, name: "pransh", age: 2 }
    ];
    res.render("user", { users });
});

// Register user routes
app.use("/api", userRoutes);
app.use('/api/doctors', doctorRoutes);

// Profile upload route
app.post('/profile', upload.single('avatar'), function(req, res, next) {
    if (!req.file) {
        return res.status(400).send("No File Uploaded");
    }
    // Redirecting to /allimages route to render all images
    res.redirect('/allimages');
});

// Route to display all images
app.get("/allimages", (req, res) => {
    fs.readdir(uploadDir, (err, files) => {
        if (err) {
            return res.status(500).send("Unable to scan directory: " + err);
        }
        // Map the files to image URLs
        const imageUrls = files.map(file => `/uploads/${file}`);
        res.render("allimages", { imageUrls: imageUrls });
    });
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});