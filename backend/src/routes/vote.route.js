import { Router } from "express";
import authorizeUser from "../middlewares/auth.user.js";
import VoteController from "../controllers/vote.controller.js";

const voteRouter = Router();

voteRouter.post('/options/:optionId/vote', authorizeUser, VoteController.vote);

export default voteRouter;
