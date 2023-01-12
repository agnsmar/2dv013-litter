import createError from 'http-errors'
import { Request, Response, NextFunction } from 'express'
import { prisma } from '../config/prisma'
import { Prisma } from '@prisma/client'

export class LitController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const user_id = Number(req.params.id)
      
      if(isNaN(user_id)) {
        next(createError(400, 'ID must be a number'))
        return
      }

      const lits = await prisma.lit.findMany({ where: { user_id } })

      res.json(lits)
    } catch (error) {
      next(error)
    }
  }
}
