import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { CATEGORY_TYPES } from '~/utils/constants'
import { GET_DB } from '~/config/mongodb'

const CATEGORY_COLLECTION_NAME = 'categories'
const CATEGORY_COLLECTION_SCHEMA = Joi.object({
  name: Joi.string().required().min(3).max(100).trim().strict(),
  type: Joi.string().valid(CATEGORY_TYPES.ACCESSORIES, CATEGORY_TYPES.SERVICES).required(),

  slug: Joi.string().required().min(3).trim().strict(),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const validateBeforeCreate = async (data) => {
  return await CATEGORY_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)

    const result = await GET_DB().collection(CATEGORY_COLLECTION_NAME).insertOne(validData)

    return result
  } catch (error) { throw new Error(error)}
}

const findOneById = async (categoryId) => {
  try {
    const result = await GET_DB().collection(CATEGORY_COLLECTION_NAME).findOne({
      _id: new ObjectId(String(categoryId))
    })

    return result
  } catch (error) { throw new Error(error) }
}

const getCategories = async (categoryType) => {
  try {
    const products = await GET_DB().collection(CATEGORY_COLLECTION_NAME).find({
      type: categoryType
    }).toArray()

    return products
  } catch (error) { throw new Error(error) }
}

export const categoryModel = {
  CATEGORY_COLLECTION_NAME,
  CATEGORY_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  getCategories
}