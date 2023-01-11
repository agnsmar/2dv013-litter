import createError from 'http-errors'
import validator from 'validator'
import { Request, Response, NextFunction } from 'express'
import { prisma } from '../config/prisma'
const { isURL } = validator

export class ProfileController {
  async create (req: Request, res: Response, next: NextFunction) {
    try {
      const preProfile = await prisma.profile.findFirst({ where: { user_id: req.account.id }})

      if(preProfile) {
        // Conflict, this could really return whatever status code, there are many correct answers
        next(createError(409, 'This user already has a profile'))
        return
      } 

      // Input validation
      if (req.body.avatar && !isURL(req.body.avatar)) {
        next(createError(400, 'Invalid Avatar URL'))
        return
      }

      if (!req.body.content || req.body?.content.length > 42) {
        next(createError(400, 'Invalid Content'))
        return
      }

      const profile = await prisma.profile.create({
        data: {
          avatar: req.body.avatar,
          content: req.body.content,
          user_id: req.account.id
        }
      })

      res
        .status(201)
        .json(profile)
    } catch (error) {
      next(error)
    }
  }

  async replace (req: Request, res: Response, next: NextFunction) {
    try {
      // Input validation
      if (req.body.avatar && !isURL(req.body.avatar)) {
        next(createError(400, 'Invalid Avatar URL'))
        return
      }

      if (!req.body.content || req.body?.content.trim().length > 42) {
        next(createError(400, 'Invalid Content'))
        return
      }
      
      const profile = await prisma.profile.update({
        where: { 
          id: req.account.id 
        },
        data: {
          avatar: req.body.avatar,
          content: req.body.content.trim(),
          user_id: req.account.id
        }
      })

      res
        .status(200)
        .json(profile)
    } catch (error) {
      next(error)
    }
  }

  async modify (req: Request, res: Response, next: NextFunction) {
    try {
      const data = {
        avatar: req.body?.avatar,
        content: req.body?.content.trim()
      }
      
      // Validation
      if (data.avatar && !isURL(data?.avatar)) {
        next(createError(400, 'Invalid Avatar URL'))
        return
      }

      if (data.content && data?.content.length > 42) {
        next(createError(400, 'Invalid Content'))
        return
      }

      const profile = await prisma.profile.update({
        where: { 
          id: req.account.id 
        },
        data
      })

      res
        .status(200)
        .json(profile)
    } catch (error) {
      next(error)
    }
  }

  async delete (req: Request, res: Response, next: NextFunction) {
    try {
      await prisma.profile.delete({ where: { id: req.account.id }})

      res
        .status(204)
        .send()
    } catch (error) {
      next(error)
    }
  }
}
