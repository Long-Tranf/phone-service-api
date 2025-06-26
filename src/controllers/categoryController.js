import { StatusCodes } from 'http-status-codes'
import { categoryService } from '~/services/categoryService'

const createNew = async (req, res, next) => {
  try {
    const createdCategory = await categoryService.createNew(req.body)
    console.log('code run qua controller')


    res.status(StatusCodes.OK).json(createdCategory)
  } catch (error) { next(error) }
}

const getCategories = async (req, res, next) => {
  try {
    const result = await categoryService.getCategories(req.query.type)

    res.status(StatusCodes.OK).json(result)
  } catch (error) { next(error)}
}

export const categoryController = {
  createNew,
  getCategories
}