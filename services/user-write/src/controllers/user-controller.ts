import createError from 'http-errors'
import bcrypt from 'bcrypt'
import validator from 'validator'
import { Request, Response, NextFunction } from 'express'
import { prisma } from '../config/prisma'
const { isEmail } = validator

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

  /**
   * I only exist as a sanity check :)
   */
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

  /**
   * I only exist as a sanity check :)
   */
  async findAll (req: Request, res: Response, next: NextFunction) {
    try {
      const users = await prisma.user.findMany({})

      res.json(users)
    } catch (error) {
      next(error)
    }
  }
  
  async register (req: Request, res: Response, next: NextFunction) {
    try {
      if (!isEmail(req.body.email)) {
        next(createError(404, `${req.body.email} is not a valid email address.`))
        return
      }

      const user = await prisma.user.create({
        data: {
          email: req.body.email,
          username: req.body.username,
          password: await bcrypt.hash(req.body.password, 10),
        }
      })

      res
      .status(201)
      .json(user.id)
    } catch (error: any) {
      let err = error
      if (err.code === 'P2002') {
        let message = 'Duplicated keys' // Placeholder message
 
        if (err.message.includes('email_UNIQUE')) message = 'A user is already registered to that email address.'
        if (err.message.includes('username_UNIQUE')) message = 'That username is already taken.'
        // Duplicated keys.
        err = createError(409, message)
      }

      next(err)
    }
  }

  async login (req: Request, res: Response, next: NextFunction) {
    try {
      const user = await prisma.user.findFirst({ where: { email: req.body.email }})
      
      if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        next(createError(401, 'Invalid email or password.'))
        return
      }

      // TODO: What should happen here?

      res
        .status(200)
        .json('you did it yay') //
    } catch (error) {
      next(error)
    }
  }
}
