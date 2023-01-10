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
      if (decoded) return false

      // Other login logic goes here.

      const refreshToken = ath.generateRefreshToken({ userid: '1' })
      const accessToken = ath.generateAccessToken({ userid: '1' })

      res.setHeader('x-access-token', 'Bearer ' + accessToken)
      res.setHeader('x-refresh-token', 'Bearer ' + refreshToken)

      return true
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
    }
  }
}

export default resolvers as GraphQLResolverMap<any>
