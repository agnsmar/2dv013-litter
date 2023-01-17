import createError from 'http-errors'
import express from 'express'
import { Request, Response, NextFunction } from 'express'
import { FollowingController } from '../controllers/following-controller'
import { authenticateJWT } from './router'

export const router = express.Router()
const controller = new FollowingController()

// Provide user id to the request if :id exists in the route path
router.param('id', (req, res, next, id) => controller.prepQuery(req, res, next, id))

// Add a new follwing relation between a given user and the authenticated user
router.post('/:id', 
  (req, res, next) => authenticateJWT(req, res, next),
  (req, res, next) => controller.create(req, res, next)
)

// Remove a new follwing relation between a given user and the authenticated user
router.delete('/:id',
  (req, res, next) => authenticateJWT(req, res, next),
  (req, res, next) => controller.delete(req, res, next)
)