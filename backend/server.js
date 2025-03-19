const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const walletRoutes = require("./routes/wallet");

// Load Environment Variables
dotenv.config();

// Initialize App
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use("/api", walletRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
