import createError from 'http-errors'
import express from 'express'

import { UserController } from '../controllers/user-controller'
 
export const router = express.Router()
const controller = new UserController()

// Register
router.post('/register', (req, res, next) => controller.register(req, res, next))
