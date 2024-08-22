const validateReqBody = (validationFunction) => async (req, res,next) => {
  const error = validationFunction(req.body);

  if (error && error.error && error.error.details && error.error.details[0]) {
    return res.status(400).json({ message: error.error.details[0].message });
  }

  return next();
};

export default validateReqBody;
