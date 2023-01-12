import createError from 'http-errors'
import bcrypt from 'bcrypt'
import validator from 'validator'
import { Request, Response, NextFunction } from 'express'
import { prisma } from '../config/prisma'

const { isEmail } = validator

export class UserController {
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
          password: await bcrypt.hash(req.body.password, 10)
        }
      })

      await prisma.profile.create({
        data: {
          user_id: user.id
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
}
