import { StatusCodes } from 'http-status-codes'
import { productService } from '~/services/productService'

const createNew = async (req, res, next) => {
  try {
    const createdProduct = await productService.createNew(req.body)

    res.status(StatusCodes.OK).json(createdProduct)
  } catch (error) {
    next(error)
  }
}

const getAllProducts = async (req, res, next) => {
  try {
    const result = await productService.getAllProducts()

    res.status(StatusCodes.OK).json(result)
  } catch (error) { next(error)}
}

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params

    const product = await productService.getProductById(id)

    res.status(StatusCodes.OK).json(product)
  } catch (error) { next(error) }
}

export const productController = {
  createNew,
  getAllProducts,
  getProductById
}