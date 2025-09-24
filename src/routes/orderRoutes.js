import { Router } from "express";
import {
  getOrders,
  getOrderById,
  createOrder,
} from "../controllers/orderController.js";
import { body, param } from "express-validator";
import { validate } from "../middleware/validateMiddleware.js";

const router = Router();

router.get("/", getOrders);

router.get(
  "/:id",
  [param("id").isInt({ min: 1 }).withMessage("id must be a positive integer")],
  validate,
  getOrderById
);

router.post(
  "/",
  [
    body("customer_name")
      .isString()
      .trim()
      .notEmpty()
      .withMessage("customer_name is required"),
    body("product_id")
      .isInt({ min: 1 })
      .withMessage("product_id must be a positive integer"),
    body("quantity").isInt({ min: 1 }).withMessage("quantity must be >= 1"),
  ],
  validate,
  createOrder
);

export default router;
