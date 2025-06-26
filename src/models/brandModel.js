import Joi from 'joi'
import { GET_DB } from '~/config/mongodb'
import { ObjectId } from 'mongodb'

const BRAND_COLLECTION_NAME = 'brands'
const BRAND_COLLECTION_SCHEMA = Joi.object({
  name: Joi.string().required().min(3).max(100).trim().strict(),
  logo: Joi.string().uri().required().strict(),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const validateBeforeCreate = async (data) => {
  return await BRAND_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)

    const result = await GET_DB().collection(BRAND_COLLECTION_NAME).insertOne(validData)

    return result
  } catch (error) { throw new Error(error) }
}

const findOneById = async (brandId) => {
  try {
    const result = await GET_DB().collection(BRAND_COLLECTION_NAME).findOne({
      _id: new ObjectId(String(brandId))
    })

    return result
  } catch (error) { throw new Error(error) }
}

const getBrands = async () => {
  try {
    const result = await GET_DB().collection(BRAND_COLLECTION_NAME).find().toArray()

    return result
  } catch (error) { throw new Error(error) }
}

export const brandModel = {
  BRAND_COLLECTION_NAME,
  BRAND_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  getBrands
}