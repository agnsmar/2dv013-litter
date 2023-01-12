import createError from 'http-errors'
import express from 'express'
import { Request, Response, NextFunction } from 'express'
import { FollowingController } from '../controllers/following-controller'
import { authenticateJWT } from './router'

export const router = express.Router()
const controller = new FollowingController()

// Add a new follwing relation between a given user and the authenticated user
router.post('/', 
  (req, res, next) => authenticateJWT(req, res, next),
  (req, res, next) => controller.create(req, res, next)
)

// Remove a new follwing relation between a given user and the authenticated user
router.delete('/',
  (req, res, next) => authenticateJWT(req, res, next),
  (req, res, next) => controller.delete(req, res, next)
)