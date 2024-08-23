import validateReqBody from "./req.body.validation.js";
import TopicValidation from "../validations/topic.validation.js";

export const validateCreateTopic = validateReqBody(TopicValidation.createTopic);

export const validatePostponeTopic = validateReqBody(TopicValidation.postpone);

export const validateExtendTopic = validateReqBody(TopicValidation.extend);
