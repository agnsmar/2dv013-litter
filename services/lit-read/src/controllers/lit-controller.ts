import createError from 'http-errors'
import { Request, Response, NextFunction } from 'express'

export class LitController {
  async helloWorld (req: Request, res: Response, next: NextFunction) {
    try {
      const response = {
        hello: "world"
      }
      
      res.json(response)
    } catch (error) {
      next(error)
    }
  }
}
