import Joi from 'joi';

class TopicValidation {
  static createTopic = (requestBody) => {
    const schema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      status: Joi.string().valid('INACTIVE', 'ACTIVE', 'CANCELLED'),
      startDate: Joi.date().min('now').required(),
      endDate: Joi.date().greater(Joi.ref('startDate')).required(),
      votesCount: Joi.number().integer().min(0).default(0),
      options: Joi.array()
        .items(Joi.string())
        .min(2)
        .max(5)
        .required(),
    });

    return schema.validate(requestBody);
  }

  static postpone = (requestBody) => {
    const schema = Joi.object({
      startDate: Joi.date().min('now').required(),
    });

    return schema.validate(requestBody);
  }

  static extend = (requestBody) => {
    const schema = Joi.object({
      endDate: Joi.date().required(),
    });

    return schema.validate(requestBody);
  }

}

export default TopicValidation;
