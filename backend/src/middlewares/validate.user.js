import validateReqBody from "./req.body.validation.js";
import UserDao from "../models/user.dao.js";
import UserValidation from "../validations/user.validation.js"

export const validateRegisterUser = validateReqBody(UserValidation.signup);

export const validateLoginUser = validateReqBody(UserValidation.login);

export const validateEmailExistnace = async (req, res, next) => {
  const email = req.body.email;

  try {
    const user = await UserDao.getUserByEmail(email);
    if (user) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    return next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};