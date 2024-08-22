import joi from "joi";

class UserValidation {
  static login (requestBody) {
    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(6).required(),
    });

    return schema.validate(requestBody);
  }

  static signup (requestBody) {
    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(6).required(),
      firstName: joi.string().trim().min(3).required(),
      lastName: joi.string().trim().min(3).required(),
      nationalId: joi.string().min(14).max(14).required(),
    });

    return schema.validate(requestBody);
  }
}

export default UserValidation;