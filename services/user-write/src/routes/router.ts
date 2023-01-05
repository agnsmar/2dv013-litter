import createError from 'http-errors'
import express from 'express'

import { UserController } from '../controllers/user-controller'
 
export const router = express.Router()
const controller = new UserController()

const baseURL = process.env.BASE_URL

// Redirect to API
router.get('/', (req, res, next) => res.redirect(baseURL + '/'))

// Hello World Example
router.get(baseURL + '/', (req, res, next) => controller.helloWorld(req, res, next))

// Catch loose routes, return 404.
router.use('*', (req, res, next) => next(createError(404)))
