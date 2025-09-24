import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next();
    const extracted = errors
      .array()
      .map((err) => ({ field: err.path, message: err.msg }));
    return res.status(400).json({ errors: extracted });
  }
};
