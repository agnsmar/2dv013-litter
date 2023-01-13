import createError from 'http-errors'
import { Request, Response, NextFunction } from 'express'
import { prisma } from '../config/prisma'

export class FollowingController {
  async findAll (req: Request, res: Response, next: NextFunction) {
    try {
      const followings = await prisma.following.findMany({where: { follower_id: req.account.id }})

      res.json(followings)
    } catch (error) {
      next(error)
    }
  }
}
