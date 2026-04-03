const Joi = require('joi');

const validateRecord = (req, res, next) => {
  const schema = Joi.object({
    amount: Joi.number().min(0.01).required(),
    type: Joi.string().valid('income', 'expense').required(),
    category: Joi.string().max(50).required(),
    description: Joi.string().allow('', null),
    date: Joi.date().iso().allow(null)
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }
  next();
};

const validateAuth = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('Viewer', 'Analyst', 'Admin').optional()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }
  next();
};

module.exports = {
  validateRecord,
  validateAuth
};
