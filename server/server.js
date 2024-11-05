// FRAMEWORK CONFIGURATION
// --- Always Import/Require on top ---
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require('./config/dbConnection');
const exampleRoute = require('./routes/example'); 
var hbs = require('hbs');
const errorHandler=require("./middlewares/errorHandler");
hbs.registerPartials(__dirname+'/views/partials',function(err){});


// env file config
dotenv.config();

// Connect to the database
connectDb();

const app = express();
const port = process.env.PORT || 8080;  // Default to port 8080

// Middleware configuration
app.use(express.json());  // Parse incoming JSON requests
app.use(cors());  // Enable CORS for security


app.use("/api/register",require("./routes/userRoutes"));

// Set Handlebars (hbs) as the view engine
app.set('view engine', 'hbs');

// Route configuration
app.use('/example', exampleRoute);  // Route for '/example'


// Updated /home route with multiple users using a for loop
app.get("/home", (req, res) => {
    const users = [
        { name: "Rahul Sharma", age: 20, email: "rahulsharma@gmail.com" },
        { name: "Raghav Thakur", age: 19, email: "thakur@gmail.com" },
        { name: "Rachit Walia", age: 20, email: "waaloo@gmail.com" }
    ];
    
    res.render("home", {
        users: users
    });
});

app.get("/allusers", (req, res) => {
    res.render("user", {
        users: [{id:1, username: "Rahul"},{id:1, username: "Sharma"}]});
});
// Health check route
app.get('/', (req, res) => {
    res.send("Server is working");
});

// APP CONFIG START
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});