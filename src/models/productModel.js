import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { GET_DB } from '~/config/mongodb'
import { brandModel } from '~/models/brandModel'
import { categoryModel } from '~/models/categoryModel'

const PRODUCT_COLLECTION_NAME = 'products'
const PRODUCT_COLLECTION_SCHEMA = Joi.object({
  name: Joi.string().required().min(3).max(100).trim().strict(),
  price: Joi.number().required().min(0).precision(3).strict(),
  category: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  sku: Joi.string().required().min(8).max(10).strict(),
  description: Joi.string().required().min(10).max(256).trim().strict(),
  tags: Joi.array().items(
    Joi.string().trim().min(1).max(50)
  ),

  slug: Joi.string().required().min(3).trim().strict(),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const validateBeforeCreate = async (data) => {
  return await PRODUCT_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    const result = await GET_DB().collection(PRODUCT_COLLECTION_NAME).insertOne(validData)

    return result
  } catch (error) { throw new Error(error) }
}

const findOneById = async (productId) => {
  try {
    const result = await GET_DB().collection(PRODUCT_COLLECTION_NAME).findOne({
      _id: new ObjectId(String(productId))
    })

    return result
  } catch (error) { throw new Error(error) }
}

const getAllProducts = async () => {
  try {
    const products = await GET_DB().collection(PRODUCT_COLLECTION_NAME).find().toArray()

    return products
  } catch (error) { throw new Error(error) }
}

const getProductById = async (id) => {
  try {
    const queryCondition = [
      { _id: new ObjectId(String(id)) },
      { _destroy: false }
    ]

    const result = await GET_DB().collection(PRODUCT_COLLECTION_NAME).aggregate([
      { $match: { $and: queryCondition } },
      { $lookup: {
        from: categoryModel.CATEGORY_COLLECTION_NAME,
        localField: 'categoryId',
        foreignField: '_id',
        as: 'category',
        pipeline: [
          { $project: { name: 1 } }
        ]
      } },
      { $lookup: {
        from: brandModel.BRAND_COLLECTION_NAME,
        localField: 'brandId',
        foreignField: '_id',
        as: 'brand',
        pipeline: [
          { $project: { name: 1, logo: 1 } }
        ]
      } }
    ]).toArray()

    return result[0] || null
  } catch (error) { throw new Error(error) }
}

export const productModel = {
  createNew,
  findOneById,
  getAllProducts,
  getProductById
}