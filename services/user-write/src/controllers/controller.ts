import createError from 'http-errors'
import { Request, Response, NextFunction } from 'express'
import { prisma } from '../config/prisma'

export class Controller {
  async index (req: Request, res: Response, next: NextFunction) {
    try {
      const data: any = {}
      data.links = this.#getNavLinks(req)
      res
        .status(200)
        .json(data)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Creates navigation links to make navigating the API easier.
   *
   * @param {object} req - Express request object.
   *
   * @returns {object} navigational API links.
   */
  #getNavLinks (req: Request) {
    const links = {
      self: {
        href: req.protocol + '://' + req.get('host') + req.baseUrl + req.path
      },
      users: {
        href: req.protocol + '://' + req.get('host') + req.baseUrl + req.path + 'users'
      },
      profiles: {
        href: req.protocol + '://' + req.get('host') + req.baseUrl + req.path + 'profiles'
      }
    }
    return links
  }

}
