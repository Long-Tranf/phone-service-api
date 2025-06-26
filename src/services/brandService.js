/* eslint-disable no-useless-catch */
import { brandModel } from '~/models/brandModel'

const createNew = async (reqBody) => {
  try {
    const createdBrand = await brandModel.createNew(reqBody)
    const getNewBrand = await brandModel.findOneById(createdBrand.insertedId)

    return getNewBrand
  } catch (error) { throw error }
}

const getBrands = async () => {
  try {
    const brands = await brandModel.getBrands()

    return brands
  } catch (error) { throw error }
}

export const brandService = {
  createNew,
  getBrands
}