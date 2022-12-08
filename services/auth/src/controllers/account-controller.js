/**
 * Module for the AccountController.
 *
 * @version 1.0.0
 */

import createError from 'http-errors'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.js'
import { Token } from '../models/token.js'

/**
 * Generates access token.
 *
 * @param {*} user - The payload.
 * @returns {*} - The accessToken
 */
export function generateAccessToken (user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: 'HS256',
    expiresIn: '30s'
  })
}

/**
 * Check if valid jwt token.
 *
 * @param {String} token - The token
 * @returns - True if valid.
 */
async function validToken (token) {
  if (token) {
    try {
      const found = await Token.find({ token: token })
      if (found.length > 0) {
        return true
      }
      return false
    } catch (err) {
      return false
    }
  }
  return false
}

/**
 * Encapsulates a controller.
 */
export class AccountController {
  /**
    * Check if user is online.
    *
    * @param {object} req - Express request object.
    * @param {object} res - Express response object.
    * @param {Function} next - Express next middleware function.
    * @returns
    */
  async checkOnline (req, res, next) {
    try {
      // Check if valid access token
      const accessToken = req.cookies['auth-token']?.split(' ') || req.headers.authorization?.split(' ')

      if (accessToken) {
        jwt.verify(accessToken[1], process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
          if (payload && validToken(accessToken[1])) {
            // If valid accesstoken
            res.status(403)
            res.send('Already logged in')
          } if (err) {
            next(err)
          }
        })
      }
      next()
    } catch (err) {
      next(err)
    }
  }

  /**
   * Get user online status.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns
   */
  async getOnlineStatus (req, res, next) {
    const authorization = req.cookies['auth-token']?.split(' ') || req.headers.authorization?.split(' ')

    // If no access token return offline
    if (authorization?.[0] !== 'Bearer') {
      return res.send({ online: false })
    }

    try {
      // Try to use access token
      jwt.verify(authorization[1], process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        // ... if invalid access token try create new based on refreshtoken
        if (err) {
          const refreshToken = req.cookies['refresh-token']?.split(' ')
          // Check if valid refresh token
          if (refreshToken !== undefined && validToken(refreshToken[1])) {
            const payload = jwt.verify(refreshToken[1], process.env.REFRESH_TOKEN_SECRET)
            const accessToken = generateAccessToken({ sub: payload.sub })

            res.cookie('auth-token', 'Bearer ' + accessToken, {
              sameSite: 'None',
              path: '/',
              httpOnly: true,
              maxAge: 1000 * 60 * 60 * 24, // 1 day
              secure: true
            })
            res.send({
              online: true,
              user: payload.sub
            })
            return
          }
        // Valid access token
        } else {
          return res.send({
            online: true,
            user: payload.sub
          })
        }
        // Invalid refreshtoken
        return res.send({ online: false })
      })
    } catch (err) {
      next(err)
    }
  }

  /**
   * Registers a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async register (req, res, next) {
    try {
      if (req.body.password !== req.body.password2) {
        next(createError(403, 'Password must match.'))
      } else {
        await User.insert({
          username: req.body.username,
          password: req.body.password,
          passwordConfirmation: req.body.password2
        })

        res
          .status(201)
          .send('Registration successful!')
      }
    } catch (error) {
      // Dublicated keys
      if (error.code === 11000) {
        return next(createError(400, 'Username already exists.'))
      // Validation error(s).
      } else if (error.name === 'ValidationError') {
        // Fix error message
        let message = error.message.replace(error._message, '')
        message = message.split(':')[2].split(',')[0]

        return next(createError(400, message))
      }
      res.status(500)
      next(createError(500))
    }
  }

  /**
   * Authenticates a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async login (req, res, next) {
    try {
      if (req.body.username === undefined || req.body.username.length < 1) {
        return next(createError(400, 'Username is missing.'))
      } else if (req.body.password === undefined || req.body.password.length < 1) {
        return next(createError(400, 'Password is missing.'))
      }

      const user = await User.authenticate(req.body.username, req.body.password)

      const payload = {
        sub: user.username
      }

      // Create the access token with the shorter lifespan.
      const accessToken = generateAccessToken(payload)
      // Save accessToken to database
      await Token.insert({
        token: accessToken
      })

      // Create the refresh token.
      const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET)
      // Save refreshToken to database
      await Token.insert({
        token: refreshToken
      })

      res
        .status(200)
        .cookie('auth-token', 'Bearer ' + accessToken, {
          sameSite: 'None',
          path: '/',
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24, // 1 day
          secure: true
        })
        .cookie('refresh-token', 'Bearer ' + refreshToken, {
          sameSite: 'None',
          path: '/',
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24, // 1 day,
          secure: true
        })
        .send('Login successful')
    } catch (error) {
      // Authentication failed.
      next(createError(401, error))
    }
  }

  /**
   * Log out.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async logout (req, res, next) {
    try {
      const refreshToken = req.cookies['refresh-token']?.split(' ')
      const authToken = req.cookies['auth-token']?.split(' ') || req.headers.authorization?.split(' ')

      // If valid refreshtoken delete this
      if (refreshToken) {
        if (await validToken(refreshToken[1])) {
          // Delete refreshtoken from database
          await Token.deleteOne({ token: refreshToken[1] })
        }
      }

      // If valid authtoken delete this
      if (authToken) {
        if (await validToken(authToken[1])) {
          await Token.deleteOne({ token: authToken[1] })
        }
      }

      if (refreshToken !== undefined || authToken !== undefined) {
        return res
          .status(204)
          .clearCookie('auth-token', { sameSite: 'None', secure: true })
          .clearCookie('refresh-token', { sameSite: 'None', secure: true })
          .send('Logout successful')
      }

      res
        .status(403)
        .send('Already logged out.')
    } catch (err) {
      next(err)
    }
  }
}
