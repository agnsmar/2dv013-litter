import createError from 'http-errors'
import express from 'express'
import { Request, Response, NextFunction } from 'express'
import { ProfileController } from '../controllers/profile-controller'
import { authenticateJWT } from './router'

export const router = express.Router()
const controller = new ProfileController()

// Add a new profile: remove this?
router.post('/', 
  (req, res, next) => authenticateJWT(req, res, next),
  (req, res, next) => controller.create(req, res, next)
)

// Replace the authenticated user's profile
router.put('/',
  (req, res, next) => authenticateJWT(req, res, next),
  (req, res, next) => controller.replace(req, res, next)
)

// Partially update the authenticated user's profile
router.patch('/',
  (req, res, next) => authenticateJWT(req, res, next),
  (req, res, next) => controller.modify(req, res, next)
)

// Delete the authenticated user's profile: remove this?
router.delete('/',
  (req, res, next) => authenticateJWT(req, res, next),
  (req, res, next) => controller.delete(req, res, next)
)
