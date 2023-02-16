import { GraphQLResolverMap } from '@apollo/subgraph/dist/schema-helper'
import { Resolvers } from '../generated/graphql'
import axios, { AxiosError } from 'axios'
import { AuthTokenHelper } from '../util/authTokenHelper'

const resolvers: Resolvers = {
  Query: {
    async profile(_, params, context) {
      const { userid } = params

      try {
        const [user, profile, lits] = await Promise.all([
          axios({
            url: `${process.env.USER_READ_SERVICE}/users/${userid}`,
            method: 'GET',
            responseType: 'json'
          }),
          axios({
            url: `${process.env.USER_READ_SERVICE}/profiles/${userid}`,
            method: 'GET',
            responseType: 'json'
          }),
          axios({
            url: `${process.env.LIT_READ_SERVICE}/lits/${userid}`,
            method: 'GET',
            responseType: 'json'
          })
        ])

        return {
          profile: {
            avatar: profile.data.profile.avatar,
            username: user.data.user.username,
            content: profile.data.profile.content,
            lits: lits.data ? [...lits.data] : []
          }
        }
      } catch (e) {
        if (e instanceof AxiosError) {
          return {
            error: {
              message: e.response!.data.message
            }
          }
        } else {
          return {
            error: {
              message: 'Internal server error'
            }
          }
        }
      }
    },
    async checkFollowing(_, params, context) {
      const { followeeId } = params
      const ath = new AuthTokenHelper()
      const accessToken = context.req.headers['x-access-token'] as string | undefined
      const token = ath.verifyAccessToken(accessToken)

      try {
        const { data: followers } = await axios({
          url: `${process.env.USER_READ_SERVICE}/followings/${followeeId}`,
          method: 'GET',
          headers: {
            'Authorization': accessToken ?? ''
          },
          responseType: 'json'
        })

        for (const follower of followers) {
          if (follower.id === token?.userid) {
            return {
              followerCount: followers.length,
              isFollowing: true
            }
          }
        }

        return {
          followerCount: followers.length,
          isFollowing: false
        }
      } catch (e) {
        return {
          followerCount: 0,
          isFollowing: false
        }
      }
    }
  },
  Mutation: {
    async follow(_, params, context) {
      const { req } = context
      const { followeeId } = params

      try {
        await axios({
          url: `${process.env.USER_WRITE_SERVICE}/followings/${followeeId}`,
          method: 'POST',
          headers: {
            'Authorization': req.headers['x-access-token'] || ''
          },
          responseType: 'json'
        })

        return {
          success: true
        }
      } catch (e) {
        if (e instanceof AxiosError) {
          return {
            success: false,
            error: {
              message: e.response!.data.message
            }
          }
        } else {
          return {
            success: false,
            error: {
              message: 'Internal server error'
            }
          }
        }
      }
    },
    async unfollow(_, params, context) {
      const { req } = context
      const { followeeId } = params

      try {
        await axios({
          url: `${process.env.USER_WRITE_SERVICE}/followings/${followeeId}`,
          method: 'DELETE',
          headers: {
            'Authorization': req.headers['x-access-token'] || ''
          },
          responseType: 'json'
        })

        return {
          success: true
        }
      } catch (e) {
        if (e instanceof AxiosError) {
          return {
            success: false,
            error: {
              message: e.response!.data.message
            }
          }
        } else {
          return {
            success: false,
            error: {
              message: 'Internal server error'
            }
          }
        }
      }
    }
  }
}

export default resolvers as GraphQLResolverMap<any>
