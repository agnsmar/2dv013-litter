import createError from 'http-errors'
import { Request, Response, NextFunction } from 'express'
import { prisma } from '../config/prisma'

export class LitController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const user_id = Number(req.params.id)
      const result = await prisma.lit.findMany({ where: { user_id } })

      res.json(user_id)
    } catch (error) {
      next(error)
    }
  }
}
