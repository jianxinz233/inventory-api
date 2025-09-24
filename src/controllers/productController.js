import db from "../config/db.js";

export const getProducts = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, sku, name, stock, price FROM products ORDER BY id DESC"
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

export const addProduct = async (req, res) => {
  try {
    const { sku = null, name, stock = 0, price } = req.body;
    const [result] = await db.query(
      "INSERT INTO products (sku, name, stock, price) VALUES (?, ?, ?, ?)",
      [sku, name, Number(stock), Number(price)]
    );
    res.status(201).json({
      id: result.insertId,
      sku,
      name,
      stock: Number(stock),
      price: Number(price),
    });
  } catch (err) {
    next(err);
  }
};
