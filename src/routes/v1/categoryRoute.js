import express from 'express'
import { categoryValidation } from '~/validations/categoryValidation'
import { categoryController } from '~/controllers/categoryController'

const Router = express.Router()

Router.route('/')
  .get(categoryValidation.getCategories, categoryController.getCategories)
  .post(categoryValidation.createNew, categoryController.createNew)

export const categoryRoute = Router
