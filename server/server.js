// FRAMEWORK CONFIGURATION
// --- Always Import/Require on top ---
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDb = require("./config/dbConnection");
const hbs = require("hbs");  // Importing hbs
const path = require("path");  // Importing path
const userRoutes = require("./routes/userRoutes"); // Import user routes
const doctorRoutes = require('./routes/doctorRoutes');
const multer = require("multer");
// const upload = multer({dest: 'uploads/'});

require('dotenv').config();

// Initialize express app
const app = express();

// Configure multer for file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix+path.extname(file.originalname));
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
const port = process.env.PORT || 5500;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware for CORS (Cross-Origin Resource Sharing)
app.use(cors());

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

// User route (this is a static route for demonstration purposes)
app.get("/user", (req, res) => {
    const users = [
        {
            id: 1,
            name: "Priyanshu",
            age: 20
        },
        {
            id: 2,
            name: "Ankit",
            age: 2
        }
    ];
    res.render("user", { users });
});

// Register user routes
app.use("/api", userRoutes); // Handles routes like /api/register and /api/login
app.use('/api/doctors', doctorRoutes); // Handles doctor-related routes

// Profile upload route
app.post('/profile', upload.single('avatar'), function(req, res, next) {
    if (!req.file) {
        return res.status(400).send("No File Uploaded");
    }
    console.log(req.body);
    console.log(req.file);
    const fileName = req.file.filename;
    const imageUrl = `/uploads/${fileName}`;

    // Render the home view with imageUrl
    res.render("home", { imageUrl: imageUrl });
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});