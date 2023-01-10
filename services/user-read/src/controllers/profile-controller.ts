import createError from 'http-errors'
import { Request, Response, NextFunction } from 'express'
import { prisma } from '../config/prisma'

export class ProfileController {
  async loadProfile (req: Request, res: Response, next: NextFunction, id: string) {
    try {
      const profile = await prisma.profile.findFirst({ where: { user_id: Number(id) }})

      if (!profile) {
        next(createError(404))
        return
      }

      req.profile = profile

      next()
    } catch (error) {
      next(error)
    }
  }

  async findOne (req: Request, res: Response, next: NextFunction) {
    try {
      const data = {
        profile: req.profile
      }

      res.json(data)
    } catch (error) {
      next(error)
    }
  }

  async findAll (req: Request, res: Response, next: NextFunction) {
    try {
      const profiles = await prisma.profile.findMany({})

      res.json(profiles)
    } catch (error) {
      next(error)
    }
  }
}
