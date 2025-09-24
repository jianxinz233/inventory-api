import db from "../config/db.js";

// GET /api/orders
export const getOrders = async (_req, res) => {
  try {
    const [row] = await db.query(
      "SELECT o.id, o.customer_name, o.product_id, p.name AS product_name, o.quantity, o.total_price, o.created_at FROM orders o JOIN products p ON o.product_id = p.id ORDER BY o.id DESC"
    );
    res.json(row);
  } catch (error) {
    next(error);
  }
};

// GET /api/orders/:id
export const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const [row] = await db.query(
      "SELECT o.id, o.customer_name, o.product_id, p.name AS product_name, o.quantity, o.total_price, o.created_at FROM orders o JOIN products p ON o.product_id = p.id WHERE o.id = ?",
      [id]
    );
    if (row.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(row[0]);
  } catch (error) {
    next(error);
  }
};

// POST /api/orders {customer_name, product_id, quantity}
export const createOrder = async (req, res) => {
  const { customer_name, product_id, quantity } = req.body;

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const [rows] = await connection.query(
      "SELECT id, name, stock, price FROM products WHERE id = ? FOR UPDATE",
      [product_id]
    );
    if (rows.length === 0) {
      await connection.rollback();
      return res.status(404).json({ error: "Product not found" });
    }
    const product = rows[0];
    if (product.stock < Number(quantity)) {
      await connection.rollback();
      return res.status(400).json({ error: "Insufficient stock" });
    }

    await connection.query(
      "UPDATE products SET stock = stock - ? WHERE id = ?",
      [quantity, product_id]
    );

    const total_price = Number(product.price) * Number(quantity);

    const [result] = await connection.query(
      "INSERT INTO orders (customer_name, product_id, quantity, total_price) VALUES (?, ?, ?, ?)",
      [customer_name, product_id, quantity, total_price]
    );

    await connection.commit();

    res.status(201).json({
      id: result.insertId,
      customer_name,
      product_id,
      product_name: product.name,
      quantity: Number(quantity),
      total_price,
    });
  } catch (error) {
    await connection.rollback();
    next(error);
  } finally {
    connection.release();
  }
};
