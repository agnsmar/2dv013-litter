import createError from 'http-errors'
import express from 'express'
import { Request, Response, NextFunction } from 'express'
import { ProfileController } from '../controllers/profile-controller'
import { authenticateJWT } from './router'

export const router = express.Router()
const controller = new ProfileController()

// Find all followings of the authenticated user
router.get('/',
  (req, res, next) => authenticateJWT(req, res, next),
  (req, res, next) => controller.findAll(req, res, next)
)