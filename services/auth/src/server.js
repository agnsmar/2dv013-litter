/**
 * The starting point of the auth-service.
 *
 * @version 1.0.0
 */

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { router } from './routes/router.js'
import { connectDB } from './config/mongoose.js'

/**
 * The main function of the application.
 */
const main = async () => {
  // Connect to database
  await connectDB()

  // Creates an Express application.
  const app = express()

  // Parse requests of the content type application/x-www-form-urlencoded.
  // Populates the request object with a body object (req.body).
  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())
  app.use(cors({ origin: true, credentials: true }))
  app.use(cookieParser())

  app.use(helmet()) // XSS filter and CSRF
  // Register routes.
  app.use('/', router)

  // Error handler.
  app.use(function (err, req, res, next) {
    if (err.status === 500) {
      return res
        .status(err.status)
        .send('Internal Server Error...')
    }

    return res
      .status(err.status)
      .send(err.message)
  })

  // Starts the HTTP server listening for connections.
  app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
    console.log('Press Ctrl-C to terminate...')
  })
}

main().catch(console.error)
