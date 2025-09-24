import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT NOW() AS currentTime");
    res.send(
      `Inventory API is running | DB connected at ${rows[0].currentTime}`
    );
  } catch (err) {
    res.status(500).send("Database connection failed");
  }
});

// Mount product routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
