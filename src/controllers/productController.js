import db from "../config/db.js";

export const getProducts = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, sku, name, stock, price FROM products ORDER BY id DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const addProduct = async (req, res) => {
  const { sku, name, stock = 0, price } = req.body;
  if (!name || price == null) {
    return res.status(400).json({ error: "name and price are required" });
  }
  try {
    const [result] = await db.query(
      "INSERT INTO products (sku, name, stock, price) VALUES (?, ?, ?, ?)",
      [sku || null, name, Number(stock) || 0, Number(price)]
    );
    res
      .status(201)
      .json({
        id: result.insertId,
        sku,
        name,
        stock: Number(stock) || 0,
        price: Number(price),
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add product" });
  }
};
