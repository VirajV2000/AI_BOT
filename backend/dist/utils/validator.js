import { body, validationResult } from "express-validator";
export const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({ errors: errors.array() });
        ;
    };
};
export const loginValidator = [
    body("email").trim().isEmail().withMessage("Email should be in format"),
    body("password").trim().isLength({ min: 6 }).withMessage("Password should be of minimum 6 length")
];
export const signupValidator = [
    body("name").notEmpty().withMessage("Name can not be empty"),
    ...loginValidator,
];
//# sourceMappingURL=validator.js.map