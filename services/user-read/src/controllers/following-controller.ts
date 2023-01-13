import createError from 'http-errors'
import { Request, Response, NextFunction } from 'express'
import { prisma } from '../config/prisma'

export class FollowingController {
  async findAll (req: Request, res: Response, next: NextFunction) {
    try {
      const followings = await prisma.following.findMany({ where: { follower_id: req.account.id }})

      const followee_ids: number[] = []

      followings.forEach(following => {
        followee_ids.push(following.followee_id)
      })

      res.json(followee_ids)
    } catch (error) {
      next(error)
    }
  }
}
