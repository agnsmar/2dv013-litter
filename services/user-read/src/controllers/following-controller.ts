import createError from 'http-errors'
import { Request, Response, NextFunction } from 'express'
import { prisma } from '../config/prisma'

export class FollowingController {
  async prepQuery (req: Request, res: Response, next: NextFunction, id: string) {
    try {
      req.body.user_id = Number(id)

      next()
    } catch (error) {
      next(error)
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const followings = await prisma.following.findMany({
        where: { follower_id: req.body.user_id },
        include: { followee: true }
      })

      const followees = followings.map((following) => {
        return {
          username: following.followee.username,
          id: following.followee_id
        }
      })

      res.json(followees)
    } catch (error) {
      next(error)
    }
  }
}
