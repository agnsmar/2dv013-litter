import createError from 'http-errors'
import { Request, Response, NextFunction } from 'express'
import { prisma } from '../config/prisma'

export class UserController {
  async loadUser (req: Request, res: Response, next: NextFunction, id: number) {
    try {
      const user = await prisma.user.findFirst({ where: { id }})

      if (!user) {
        next(createError(404))
        return
      }

      req.user = user

      next()
    } catch (error) {
      next(error)
    }
  }
}
