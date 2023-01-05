import createError from 'http-errors'
import { Request, Response, NextFunction } from 'express'
import { prisma } from '../config/prisma'

export class LitController {
  async helloWorld (req: Request, res: Response, next: NextFunction) {
    try {
      const result = await prisma.lit.findFirst({where: {user_id: 1}})

      res.json(result)
    } catch (error) {
      next(error)
    }
  }
}
