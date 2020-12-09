const { check, validationResult } = require("express-validator");
const { param } = require("../routes/auth.route");

const userValidationRules = [
  // prettier-ignore
  check("email")
    .not().isEmpty().withMessage("Email is required")
    .normalizeEmail().isEmail().withMessage("Incorrect email format"),
  // prettier-ignore
  check("password")
    .not().isEmpty().withMessage("Password is required")
    .isLength({ min: 6, max: 48 }).withMessage("Password must be >= 6 & <= 48")
    .matches(/(?=.*\d).+/).withMessage("Password must contain a digit"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = errors
    .array({ onlyFirstError: true })
    .map((e) => e.msg);

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  userValidationRules,
  validate,
};
