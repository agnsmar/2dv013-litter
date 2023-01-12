import createError from 'http-errors'
import { Request, Response, NextFunction } from 'express'
import { prisma } from '../config/prisma'

export class FollowingController {
  async create (req: Request, res: Response, next: NextFunction) {
    try {
      res.json('Hello World')
    } catch (error) {
      next(error)
    }
  }

  async delete (req: Request, res: Response, next: NextFunction) {
    try {
      res.json('Hello World')
    } catch (error) {
      next(error)
    }
  }
}
