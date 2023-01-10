import createError from 'http-errors'
import express from 'express'

import { UserController } from '../controllers/user-controller'
 
export const router = express.Router()
const controller = new UserController()

const baseURL = process.env.BASE_URL

// Provide req.user to the route if :id exists in the route path.
router.param('id', (req, res, next, id) => controller.loadUser(req, res, next, id))

// Register
router.post('/register', (req, res, next) => controller.register(req, res, next))
