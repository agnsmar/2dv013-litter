import createError from 'http-errors'
import bcrypt from 'bcrypt'
import validator from 'validator'
import { Request, Response, NextFunction } from 'express'
import { prisma } from '../config/prisma'
const { isEmail } = validator

export class ProfileController {
  async loadProfile (req: Request, res: Response, next: NextFunction, id: string) {
    try {
      const profile = await prisma.user.findFirst({ where: { id: Number(id) }})

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

  async create (req: Request, res: Response, next: NextFunction) {
    try {
      const profile = await prisma.profile.create({
        data: {
          avatar: req.body.avatar,
          content: req.body.content,
          user_id: req.user.id
        }
      })

      res
        .status(201)
        .json({ id: profile.id })
    } catch (error) {
      next(error)
    }
  }

  async replace (req: Request, res: Response, next: NextFunction) {
    try {
      // replace entirely
    } catch (error) {
      next(error)
    }
  }

  async modify (req: Request, res: Response, next: NextFunction) {
    try {
      // modify
    } catch (error) {
      next(error)
    }
  }

  async delete (req: Request, res: Response, next: NextFunction) {
    try {
      // delete
    } catch (error) {
      next(error)
    }
  }
}
