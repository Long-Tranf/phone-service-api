import express from 'express'
import { brandValidation } from '~/validations/brandValidation'
import { brandController } from '~/controllers/brandController'

const Router = express.Router()

Router.route('/')
  .get(brandController.getBrands)
  .post(brandValidation.createNew, brandController.createNew)

export const brandRoute = Router