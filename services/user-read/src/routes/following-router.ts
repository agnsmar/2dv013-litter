import createError from 'http-errors'
import express from 'express'
import { Request, Response, NextFunction } from 'express'
import { FollowingController } from '../controllers/following-controller'
import { authenticateJWT } from './router'

export const router = express.Router()
const controller = new FollowingController()

// Provide id to the route if :id exists in the route path.
router.param('id', (req, res, next, id) => controller.prepQuery(req, res, next, id))

// Find all followings of the given user id
router.get('/:id', (req, res, next) => controller.findAll(req, res, next))