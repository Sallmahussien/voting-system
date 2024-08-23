import validateSession from "../middlewares/validate.session.js"
import OptionController from "../controllers/option.controller.js";
import { Router } from "express";

const optionRouter = Router();

optionRouter.get('/topics/:topicId/options', validateSession, OptionController.getOptions);

export default optionRouter;
