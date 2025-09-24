import { Router } from "express";
import { getProducts, addProduct } from "../controllers/productController.js";
import { body } from "express-validator";
import { validate } from "../middleware/validateMiddleware.js";

const router = Router();

router.get("/", getProducts);

router.post(
  "/",
  [
    body("name").isString().trim().notEmpty().withMessage("name is required"),
    body("price").isFloat({ min: 0 }).withMessage("price must be >= 0"),
    body("stock")
      .optional()
      .isInt({ min: 0 })
      .withMessage("stock must be >= 0"),
    body("sku").optional().isString().trim(),
  ],
  validate,
  addProduct
);

export default router;
