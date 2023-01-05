import { Request, Response, NextFunction } from 'express'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import { router } from './routes/router.js'

const main = async () => {
  const app = express()

  app.use(helmet())
  app.use(morgan('dev'))
  app.use(express.json({limit: '100kb'}))
  app.use('/', router)

  // Error handler.
  app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
    err.status = err.status || 500

    if (req.app.get('env') !== 'development') {
      res
        .status(err.status)
        .json({
          status: err.status,
          message: err.message
        })
      
    } else {
      res
        .status(err.status)
        .json({
          status: err.status,
          message: err.message,
          innerException: err.innerException,
          stack: err.stack
        })
    }

    next()
  })

  // Starts the HTTP server listening for connections.
  app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
    console.log('Press Ctrl-C to terminate...')
  })
}

main().catch(console.error)
