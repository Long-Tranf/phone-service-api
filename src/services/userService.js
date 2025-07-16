/* eslint-disable no-useless-catch */
import { StatusCodes } from 'http-status-codes'
import { userModel } from '~/models/userModel'
import ApiError from '~/utils/ApiError'
import bcryptjs from 'bcryptjs'
import { JwtProvider } from '~/providers/JwtProvider'
import { env } from '~/config/environment'
import { pickUser } from '~/utils/formatters'

const createNew = async (reqBody) => {
  try {
    const existUser = await userModel.findOneByEmail(reqBody.email)
    if (existUser) throw new ApiError(StatusCodes.CONFLICT, 'Email already exist!')

    const nameFromEmail = reqBody.email.split('@')[0]

    const newUser = {
      email: reqBody.email,
      password: bcryptjs.hashSync(reqBody.password, 8),
      userName: nameFromEmail,
      displayName: nameFromEmail
    }

    const createdUser = await userModel.createNew(newUser)
    const getNewUser = await userModel.findOneById(createdUser.insertedId)

    return pickUser(getNewUser)
  } catch (error) { throw error }
}

const login = async (reqBody) => {
  try {
    const result = await userModel.findOneByEmail(reqBody.email)

    if (!result) throw new ApiError(StatusCodes.NOT_FOUND, 'User is not found!')
    if (!bcryptjs.compareSync(reqBody.password, result.password)) {
      throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Email or password is incorrect!')
    }

    const userInfo = { _id: result._id, email: result.email }

    const accessToken = await JwtProvider.generateToken(userInfo, env.ACCESS_TOKEN_SECRET_SIGNATURE, env.ACCESS_TOKEN_LIFE)
    const refreshToken = await JwtProvider.generateToken(userInfo, env.REFRESH_TOKEN_SECRET_SIGNATURE, env.REFRESH_TOKEN_LIFE)

    return { accessToken, refreshToken, ...pickUser(result) }
  } catch (error) { throw error }
}

export const userService = {
  login,
  createNew
}