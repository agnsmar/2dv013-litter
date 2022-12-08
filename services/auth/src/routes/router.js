/**
 * The routes.
 *
 * @version 1.0.0
 */

import express from 'express'
import createError from 'http-errors'
import { router as router } from './account-router.js'
import { AccountController } from '../controllers/account-controller.js'

export const router = express.Router()
const controller = new AccountController()

router.post('/register', controller.checkOnline, controller.register)
router.post('/login', controller.checkOnline, controller.login)
router.post('/logout', controller.logout)
router.get('/online', controller.getOnlineStatus)
 

// Catch 404 (ALWAYS keep this as the last route).
router.use('*', (req, res, next) => next(createError(404)))
