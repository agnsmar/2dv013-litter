import { GraphQLResolverMap } from '@apollo/subgraph/dist/schema-helper'
import type { Resolvers } from '../generated/graphql'
import axios, { AxiosError } from 'axios'

const resolvers: Resolvers = {
  Query: {
    me(_, __, context) {
      return { username: 'user', email: 'user@user.u' }
    }
  },
  Mutation: {
    async login(_, params, context) {
      const { email, password } = params
      const { res, token, ath } = context

      const decoded = ath.verifyAccessToken(token)
      if (decoded) {
        return {
          success: false,
          error: {
            message: 'User already logged in.'
          }
        }
      }

      try {
        const response = await axios({
          url: process.env.USER_READ_SERVICE + '/users/authenticate',
          method: 'GET',
          data: {
            email,
            password
          }
        })

        const userid = response.data.id

        const refreshToken = ath.generateRefreshToken({ userid })
        const accessToken = ath.generateAccessToken({ userid })
  
        res.setHeader('x-access-token', 'Bearer ' + accessToken)
        res.setHeader('x-refresh-token', 'Bearer ' + refreshToken)

        return {
          success: true
        }
      } catch (e: unknown) {
        if (e instanceof AxiosError) {
          return {
            success: false,
            error: {
              message: e.response!.data.message
            }
          }
        } else {
          console.error(e)
          return {
            error: {
              success: false,
              message: 'Internal server error.'
            }
          }
        }
      }
    },
    refreshToken(_, __, context) {
      const { res, req, token, ath } = context

      const refreshTokenHeader = req.headers['x-refresh-token'] as string | undefined
      const refreshToken = refreshTokenHeader?.split(' ')[1]
      const refreshDecoded = ath.verifyRefreshToken(refreshToken)
      if (!refreshDecoded) return false

      const accessDecoded = ath.verifyAccessToken(token)
      if (!accessDecoded) {
        const newAccessToken = ath.generateAccessToken({ userid: refreshDecoded.userid })
        res.setHeader('x-access-token', 'Bearer ' + newAccessToken)
      } else {
        const timeLeft = accessDecoded.exp! - Date.now()
        const second = 1000
        const minute = second * 60

        if (timeLeft < minute) {
          const newAccessToken = ath.generateAccessToken({ userid: refreshDecoded.userid })
          res.setHeader('x-access-token', 'Bearer ' + newAccessToken)
        }
      }

      return true
    },
    async register(_, params, context) {
      const { email, password, username } = params

      try {
        await axios({
          url: process.env.USER_WRITE_SERVICE + '/users/register',
          method: 'POST',
          data: {
            username: username,
            email: email,
            password: password
          }
        })

        return {
          success: true
        }
      } catch (e: unknown) {
        if (e instanceof AxiosError) {
          return {
            success: false,
            error: {
              message: e.response!.data.message
            }
          }
        } else {
          console.error(e)
          return {
            error: {
              success: false,
              message: 'Internal server error.'
            }
          }
        }
      }
    },
    logout(_, __, context) {
      const { res } = context
      res.setHeader('x-logout', 'logout')
      return null
    }
  }
}

export default resolvers as GraphQLResolverMap<any>
