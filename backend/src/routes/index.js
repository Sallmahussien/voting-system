import { Router } from 'express';
import userRouter from "./user.routes.js";
import topicRouter from './topic.routes.js';
import optionRouter from './option.route.js';
import voteRouter from './vote.route.js';

const router = Router();

router.use('/users', userRouter);
router.use('/topics', topicRouter);
router.use('/', optionRouter);
router.use('/', voteRouter);

export default router;
