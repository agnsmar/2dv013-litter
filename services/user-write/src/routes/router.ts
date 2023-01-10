import createError from 'http-errors'
import express from 'express'

import { UserController } from '../controllers/user-controller'
import { router as userRouter } from './user-router'

export const router = express.Router()
const controller = new UserController()

const baseURL = process.env.BASE_URL

// Redirect to API
router.get('/', (req, res, next) => res.redirect(baseURL + '/'))

// Use the user router
router.use(baseURL + '/users', userRouter)
