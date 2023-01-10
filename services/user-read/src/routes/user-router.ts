import createError from 'http-errors'
import express from 'express'

import { UserController } from '../controllers/user-controller'
 
export const router = express.Router()
const controller = new UserController()

const baseURL = process.env.BASE_URL

// Authentication
router.get('/authenticate', (req, res, next) => controller.authenticate(req, res, next))

// Provide req.user to the route if :id exists in the route path.
router.param('id', (req, res, next, id) => controller.loadUser(req, res, next, id))

// Find a user by ID
router.get('/:id', (req, res, next) => controller.findOne(req, res, next))

// Find all users
router.get('/', (req, res, next) => controller.findAll(req, res, next))
