import createError from 'http-errors'
import express from 'express'
import { Request, Response, NextFunction } from 'express'
import { ProfileController } from '../controllers/profile-controller'

export const router = express.Router()
const controller = new ProfileController()

// Provide req.profile to the route if :id exists in the route path.
router.param('id', (req, res, next, id) => controller.loadProfile(req, res, next, id))

// Find a profile by ID
router.get('/:id', (req, res, next) => controller.findOne(req, res, next))

// Find all profiles
router.get('/', (req, res, next) => controller.findAll(req, res, next))
