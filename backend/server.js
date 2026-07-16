const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
dotenv.config();
const app = express();
const cors = require("cors");
app.use(cors());
connectDB();
// Middleware
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Port
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});