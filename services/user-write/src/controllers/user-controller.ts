import createError from 'http-errors'
import { Request, Response, NextFunction } from 'express'
import { prisma } from '../config/prisma'

export class UserController {
  async helloWorld (req: Request, res: Response, next: NextFunction) {
    try {
      await prisma.user.create({
        data: {
          email: "pretend.fella@gmail.com",
          username: "fakeguy",
          password: "verystrongpasswordyes"
        }
      })

      const result = await prisma.user.findFirst({where: {username: "fakeguy"}})

      res.json(result)
    } catch (error) {
      next(error)
    }
  }
}
