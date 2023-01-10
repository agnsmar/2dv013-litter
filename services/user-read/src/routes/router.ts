import createError from 'http-errors'
import express from 'express'

import { Controller } from '../controllers/controller'
import { router as userRouter } from './user-router'
import { router as profileRouter } from './profile-router'

export const router = express.Router()
const controller = new Controller()

const baseURL = process.env.BASE_URL

// Redirect to API
router.get('/', (req, res, next) => res.redirect(baseURL + '/'))

// Index route, nice fella
router.get(baseURL + '/', (req, res, next) => controller.index(req, res, next))

// Use the user router
router.use(baseURL + '/users', userRouter)

// Use the profile router
router.use(baseURL + '/profiles', profileRouter)