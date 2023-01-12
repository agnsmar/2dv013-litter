import createError from 'http-errors'
import express from 'express'

import { Controller } from '../controllers/controller'
import { router as litRouter } from './lit-router'

export const router = express.Router()
const controller = new Controller()

const baseURL = process.env.BASE_URL

// Redirect to API
router.get('/', (req, res, next) => res.redirect(baseURL + '/'))

// Index route, nice fella
router.get(baseURL + '/', (req, res, next) => controller.index(req, res, next))

// Use the user router
router.use(baseURL + '/lits', litRouter)

// Catch loose routes, return 404.
router.use('*', (req, res, next) => next(createError(404)))
