import { StatusCodes } from 'http-status-codes'
import { brandService } from '~/services/brandService'

const createNew = async (req, res, next) => {
  try {
    const createdBrand = await brandService.createNew(req.body)

    res.status(StatusCodes.OK).json(createdBrand)
  } catch (error) { next(error) }
}

const getBrands = async (req, res, next) => {
  try {
    const brands = await brandService.getBrands()

    res.status(StatusCodes.OK).json(brands)
  } catch (error) { next(error) }
}

export const brandController = {
  createNew,
  getBrands
}