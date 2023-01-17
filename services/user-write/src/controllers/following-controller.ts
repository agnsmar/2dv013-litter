import createError from 'http-errors'
import { Request, Response, NextFunction } from 'express'
import { prisma } from '../config/prisma'

export class FollowingController {
  async prepQuery (req: Request, res: Response, next: NextFunction, id: string) {
    try {
      req.body.id = Number(id)

      if (isNaN(req.body.id)) {
        next(createError(400, 'ID must be a number.'))
        return
      }

      next()
    } catch (error) {
      next(error)
    }
  }

  // This could be minimized using upsert()
  async create (req: Request, res: Response, next: NextFunction) {
    try {
      const followee_id: number = req.body.id

      if (followee_id === req.account.id) {
        next(createError(401, 'A User cannot follow themselves'))
        return
      }

      const followee = await prisma.user.findUnique({ where: { id: followee_id }})
      const follower = await prisma.user.findUnique({ where: { id: req.account.id }})

      if (!followee || !follower) {
        next(createError(404, 'User or follower does not exist'))
        return
      }

      const preFollowing = await prisma.following.findFirst({ 
        where: {
          followee_id: followee_id,
          follower_id: req.account.id
        }
      })

      if (preFollowing) {
        next(createError(409, 'Already following this user'))
        return
      }

      const following = await prisma.following.create({ 
        data: {
          followee_id: followee_id,
          follower_id: req.account.id
        }
      })

      res
        .status(201)
        .json(following)
    } catch (error) {
      next(error)
    }
  }

  async delete (req: Request, res: Response, next: NextFunction) {
    try {
      const followee_id: number = req.body.id

      // This is not best practice, but the schema does not handle uniqueness right now :(
      await prisma.following.deleteMany({
        where: {
          followee_id: followee_id,
          follower_id: req.account.id
        } 
      })

      res
        .status(204)
        .send()
    } catch (error) {
      next(error)
    }
  }
}
