import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { productRoute } from './productRoute'
import { categoryRoute } from './categoryRoute'
import { brandRoute } from './brandRoute'
import { userRoute } from './userRoute'

const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json('API V1 are ready to use!')
})

//Product API
Router.use('/products', productRoute)

//Category API
Router.use('/categories', categoryRoute)

//Brand API
Router.use('/brands', brandRoute)

//User API
Router.use('/users', userRoute)


export const APIs_v1 = Router