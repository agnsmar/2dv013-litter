import createError from 'http-errors'
import express from 'express'

import { LitController } from '../controllers/lit-controller'
 
export const router = express.Router()
const controller = new LitController()

// Hello World Example
router.get('/', (req, res, next) => controller.helloWorld(req, res, next))

// Catch loose routes, return 404.
router.use('*', (req, res, next) => next(createError(404)))
