import createError from 'http-errors'
import { Request, Response, NextFunction } from 'express'
import { prisma } from '../config/prisma'
import { Prisma } from '@prisma/client'

export class LitController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const user_id = Number(req.params.id)
      const skip = req.query.skip ? Number(req.query.skip) : 0
      const take = req.query.take ? Number(req.query.take) : 20
      const cursor = req.query.cursor ? Number(req.query.cursor) : false

      if(isNaN(user_id)) {
        next(createError(400, 'ID must be a number'))
        return
      }

      if(skip < 0 || take < 0 || cursor < 0) {
        next(createError(400, 'Pagination parameters must be positive numbers'))
        return
      }

      const lits = cursor ? await this.#findManyCursor(cursor, take, user_id) : await this.#findManyOffset(skip, take, user_id)

      res.json(lits)
    } catch (error) {
      next(error)
    }
  }

  async #findManyOffset(skip: number, take: number, user_id: number) {
    return await prisma.lit.findMany({
      take,
      skip,
      where: {
        user_id
      },
      orderBy: {
        created_at: 'desc'
      }
    })
  }

  async #findManyCursor(cursor: number, take: number, user_id: number) {
    return await prisma.lit.findMany({
      take,
      skip: 1, // Skip the cursor
      cursor: {
        id: cursor
      },
      where: {
        user_id
      },
      orderBy: {
        created_at: 'desc'
      }
    })
  }
}
