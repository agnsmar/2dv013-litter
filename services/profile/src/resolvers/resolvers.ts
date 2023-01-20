import { GraphQLResolverMap } from '@apollo/subgraph/dist/schema-helper'
import { Resolvers } from '../generated/graphql'
import axios, { AxiosError } from 'axios'

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
            lits: lits.data
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
    }
  }
}

export default resolvers as GraphQLResolverMap<any>
