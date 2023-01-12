import createError from 'http-errors'
import { Request, Response, NextFunction } from 'express'
import { prisma } from '../config/prisma'

export class ProfileController {
  async findAll (req: Request, res: Response, next: NextFunction) {
    try {
      res.json('Hello World')
    } catch (error) {
      next(error)
    }
  }
}
