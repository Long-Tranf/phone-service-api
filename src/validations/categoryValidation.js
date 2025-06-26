import Joi from 'joi'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { CATEGORY_TYPES } from '~/utils/constants'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    name: Joi.string().required().min(3).max(50).trim().strict(),
    type: Joi.string().valid(CATEGORY_TYPES.ACCESSORIES, CATEGORY_TYPES.SERVICES).required()
  })

  try {
    correctCondition.validateAsync(req.body, { abortEarly: false })
    console.log('code run qua validate')

    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

const getCategories = async (req, res, next) => {
  const correctCondition = Joi.object({
    type: Joi.string().valid(CATEGORY_TYPES.ACCESSORIES, CATEGORY_TYPES.SERVICES).required()
  })

  try {
    await correctCondition.validateAsync(req.query, { abortEarly: false })

    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

export const categoryValidation = {
  createNew,
  getCategories
}