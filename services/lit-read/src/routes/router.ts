import createError from 'http-errors'
import express from 'express'

import { LitController } from '../controllers/lit-controller'
 
export const router = express.Router()
const controller = new LitController()

// Redirect to API
router.get('/', (req, res, next) => res.redirect('/api'))

// Hello World Example
router.get('/api', (req, res, next) => controller.helloWorld(req, res, next))

// Catch loose routes, return 404.
router.use('*', (req, res, next) => next(createError(404)))
