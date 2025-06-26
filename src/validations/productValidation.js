import Joi from 'joi'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    name: Joi.string().required().min(3).max(100).trim().strict().messages({
      'any.required': 'Name is required',
      'string.empty': 'Name is not allowed to be empty',
      'string.min': 'Name min 3 chars',
      'string.max': 'Name min 100 chars',
      'string.trim': 'Name must not have leading or trailing whitespace'
    }),
    price: Joi.number().required().min(0).precision(3).strict(),
    category: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    sku: Joi.string().required().min(8).max(10).strict(),
    description: Joi.string().required().min(10).max(256).trim().strict(),
    tags: Joi.array().items(
      Joi.string().trim().min(1).max(50)
    )
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })

    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

export const productValidation = {
  createNew
}