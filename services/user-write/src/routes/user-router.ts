import createError from 'http-errors'
import express from 'express'

import { UserController } from '../controllers/user-controller'
 
export const router = express.Router()
const controller = new UserController()

const baseURL = process.env.BASE_URL

// Provide req.user to the route if :id exists in the route path.
router.param('id', (req, res, next, id) => controller.loadUser(req, res, next, id))

// Find a user (Sanity check - TODO: remove)
router.get('/:id', (req, res, next) => controller.findOne(req, res, next))

// Find all users (Sanity check - TODO: remove)
router.get('/', (req, res, next) => controller.findAll(req, res, next))

// Register
router.post('/register', (req, res, next) => controller.register(req, res, next))

// Login
router.post('/login', (req, res, next) => controller.login(req, res, next))
