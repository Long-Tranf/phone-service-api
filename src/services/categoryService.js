/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatters'
import { categoryModel } from '~/models/categoryModel'

const createNew = async (reqBody) => {
  try {
    const newCategory = {
      ...reqBody,
      slug: slugify(reqBody.name)
    }

    console.log('code run den service')


    const createdCategory = await categoryModel.createNew(newCategory)

    const getNewCategory = await categoryModel.findOneById(createdCategory.insertedId)

    return getNewCategory
  } catch (error) { throw error }
}

const getCategories = async (categoryType) => {
  try {
    const products = await categoryModel.getCategories(categoryType)

    return products
  } catch (error) { throw error }
}

export const categoryService = {
  createNew,
  getCategories
}