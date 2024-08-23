import TopicController from "../controllers/topic.controller.js";
import { Router } from 'express';
import authorizeAdmin from "../middlewares/auth.admin.js";
import validateSession from "../middlewares/validate.session.js";
import {
  validateCreateTopic,
  validateExtendTopic,
  validatePostponeTopic
} from "../middlewares/validate.topic.js";

const topicRouter = Router();

topicRouter
  .post('/',
    authorizeAdmin,
    validateCreateTopic,
    TopicController.createTopic);

topicRouter.put('/:topicId/postpone', authorizeAdmin, validatePostponeTopic, TopicController.postponeTopic);
topicRouter.put('/:topicId/extend', authorizeAdmin, validateExtendTopic, TopicController.extendTopic);
topicRouter.put('/:topicId/cancel', authorizeAdmin, TopicController.cancelTopic);

topicRouter.get('/active', validateSession, TopicController.getActiveTopics);
topicRouter.get('/recent-finished', validateSession, TopicController.getRecentFinishedTopics);
topicRouter.get('/coming-soon', validateSession, TopicController.getComingSoonTopics);
topicRouter.get('/sorted', validateSession, TopicController.getAllTopicsSorted);

topicRouter.get('/postpone', authorizeAdmin, TopicController.getAllTopicsToBePostponed);
topicRouter.get('/extend', authorizeAdmin, TopicController.getAllTopicsToBeExtended);
topicRouter.get('/cancel', authorizeAdmin, TopicController.getAllTopicsToBeCancelled);

topicRouter.get('/:topicId', validateSession, TopicController.getTopicById);

export default topicRouter;

