import createError from 'http-errors'
import express from 'express'
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

import { Controller } from '../controllers/controller'
import { router as userRouter } from './user-router'
import { router as profileRouter } from './profile-router'
import { TTokenPayload } from '../types/types'

export const router = express.Router()
const controller = new Controller()

/**
 * Authenticates requests.
 *
 * Upon successful authentication, 'req.account' is populated with 
 * the id of the user, and the request is sent forward to continue.
 * Upon authentication failure, the request does not move forward 
 * and an unauthorized response is sent. 
 */
export function authenticateJWT (req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers.authorization?.split(' ')
 
  if (authorization?.[0] !== 'Bearer') {
    next(createError(401))
    return
  }
 
  try {
    const payload = jwt.verify(authorization[1], process.env.ACCESS_TOKEN_SECRET!, { algorithms: ['HS256'] }) as TTokenPayload
    req.account = {
      id: Number(payload.userid)
    }
    next()
  } catch (err) {
    next(createError(403))
  }
}

const baseURL = process.env.BASE_URL

// Redirect to API
router.get('/', (req, res, next) => res.redirect(baseURL + '/'))

// Index route, nice fella
router.get(baseURL + '/', (req, res, next) => controller.index(req, res, next))

// Use the user router
router.use(baseURL + '/users', userRouter)

// Use the user router
router.use(baseURL + '/profiles', profileRouter)