const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", require("./routes/authRoutes"));
app.use("/api/staff", require("./routes/staffRoutes"));
app.use("/api/menu", require("./routes/menuRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/inventory", require("./routes/InventoryRoutes"));
app.use("/api/tables", require("./routes/tableRoutes"));
app.use("/api/feedback", require("./routes/feedbackRoutes"));
app.use("/api/hotels", require("./routes/hotelRoutes"));

app.get("/", (req, res) => {
  res.send("welcome to RestaurantPro");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
