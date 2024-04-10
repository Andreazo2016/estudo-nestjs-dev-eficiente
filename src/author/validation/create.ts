import * as Joi from 'joi';

export const createAuthorSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    description: Joi.string().max(400).optional()

}).required()