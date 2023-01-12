import createError from 'http-errors'
import { Request, Response, NextFunction } from 'express'
import { prisma } from '../config/prisma'

export class LitController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      // Pagination Parameters
      const skip = req.query.skip ? Number(req.query.skip) : 0
      const take = req.query.take ? Number(req.query.take) : 20
      const cursor = req.query.cursor ? Number(req.query.cursor) : false

      // User ID:s to fetch lits from
      const user_ids: number[] = req.body.user_ids ?? []

      if (!user_ids.every(id => !isNaN(id))) {
        next(createError(400, 'ID must be a number'))
        return
      }

      if(skip < 0 || take < 0 || cursor < 0) {
        next(createError(400, 'Pagination parameters must be positive numbers'))
        return
      }

      const lits = cursor ? await this.#findManyCursor(cursor, take, user_ids) : await this.#findManyOffset(skip, take, user_ids)

      res.json(lits)
    } catch (error) {
      next(error)
    }
  }

  async #findManyOffset(skip: number, take: number, user_ids: number[]) {
    return await prisma.lit.findMany({
      take,
      skip,
      where: {
        user_id: { in: user_ids }
      },
      orderBy: {
        created_at: 'desc'
      }
    })
  }

  async #findManyCursor(cursor: number, take: number, user_ids: number[]) {
    return await prisma.lit.findMany({
      take,
      skip: 1, // Skip the cursor
      cursor: {
        id: cursor
      },
      where: {
        user_id: { in: user_ids }
      },
      orderBy: {
        created_at: 'desc'
      }
    })
  }
}
