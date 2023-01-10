import createError from 'http-errors'
import bcrypt from 'bcrypt'
import { Request, Response, NextFunction } from 'express'
import { prisma } from '../config/prisma'

export class UserController {
  async loadUser (req: Request, res: Response, next: NextFunction, id: string) {
    try {
      const user = await prisma.user.findFirst({ where: { id: Number(id) }})

      if (!user) {
        next(createError(404))
        return
      }

      req.user = user

      next()
    } catch (error) {
      next(error)
    }
  }

  async findOne (req: Request, res: Response, next: NextFunction) {
    try {
      const data = {
        user: req.user
      }

      res.json(data)
    } catch (error) {
      next(error)
    }
  }

  async findAll (req: Request, res: Response, next: NextFunction) {
    try {
      const users = await prisma.user.findMany({})

      res.json(users)
    } catch (error) {
      next(error)
    }
  }

  async authenticate (req: Request, res: Response, next: NextFunction) {
    try {
      const user = await prisma.user.findFirst({ where: { email: req.body.email }})
      
      if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        next(createError(401, 'Invalid email or password.'))
        return
      }

      res
        .status(200)
        .json({ id: user.id})
    } catch (error) {
      next(error)
    }
  }
}
