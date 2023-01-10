import createError from 'http-errors'
import express from 'express'
import { Request, Response, NextFunction } from 'express'
import { ProfileController } from '../controllers/profile-controller'
import { authenticateJWT } from './router'

export const router = express.Router()
const controller = new ProfileController()

/**
 * Request authorization middleware, verifies ownership of the requested profile.
 */
export const isOwner = (req: Request, res: Response, next: NextFunction) => {
  req.profile.user_id === req.account.id ? next() : next(createError(403))
}

// Provide req.profile to the route if :id exists in the route path.
router.param('id', (req, res, next, id) => controller.loadProfile(req, res, next, id))

// Add a new profile
router.post('/', 
  (req, res, next) => authenticateJWT(req, res, next),
  (req, res, next) => controller.create(req, res, next)
)

// Update an entire profile
router.put('/:id',
  (req, res, next) => authenticateJWT(req, res, next),
  (req, res, next) => isOwner(req, res, next),
  (req, res, next) => controller.replace(req, res, next)
)

// Partially update a profile
router.patch('/:id',
  (req, res, next) => authenticateJWT(req, res, next),
  (req, res, next) => isOwner(req, res, next),
  (req, res, next) => controller.modify(req, res, next)
)

// Delete a profile
router.delete('/:id',
  (req, res, next) => authenticateJWT(req, res, next),
  (req, res, next) => isOwner(req, res, next),
  (req, res, next) => controller.delete(req, res, next)
)
