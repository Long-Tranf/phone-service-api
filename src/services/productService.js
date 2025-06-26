/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatters'
import { productModel } from '~/models/productModel'
import { StatusCodes } from 'http-status-codes'
import { ApiError } from '~/utils/ApiError'


const createNew = async (reqBody) => {
  try {
    const newProduct = {
      ...reqBody,
      slug: slugify(reqBody.name)
    }

    const createdProduct = await productModel.createNew(newProduct)

    const getNewProduct = await productModel.findOneById(createdProduct.insertedId)

    return getNewProduct
  } catch (error) { throw error }
}

const getAllProducts = async () => {
  try {
    const products = await productModel.getAllProducts()

    return products
  } catch (error) { throw error }
}

const getProductById = async (id) => {
  try {
    const product = await productModel.getProductById(id)

    if (!product) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Product not found!')
    }

    return product
  } catch (error) { throw error }
}

export const productService = {
  createNew,
  getAllProducts,
  getProductById
}