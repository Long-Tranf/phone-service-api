import express from 'express'
import { productValidation } from '~/validations/productValidation'
import { productController } from '~/controllers/productController'

const Router = express.Router()

Router.route('/')
  .get(productController.getAllProducts)
  .post(productValidation.createNew, productController.createNew)

Router.route('/:id')
  .get(productController.getProductById)

export const productRoute = Router