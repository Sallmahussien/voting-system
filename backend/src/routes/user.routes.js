import UserController from "../controllers/user.controller.js";
import { Router } from 'express';
import {
  validateRegisterUser,
  validateLoginUser,
  validateEmailExistnace,
} from "../middlewares/validate.user.js";

const userRouter = Router();

userRouter
  .post('/signup',
    validateRegisterUser,
    validateEmailExistnace,
    UserController.signup);

userRouter
  .post('/login', validateLoginUser, UserController.login);

export default userRouter;

