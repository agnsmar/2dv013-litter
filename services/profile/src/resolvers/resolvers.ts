import { GraphQLResolverMap } from '@apollo/subgraph/dist/schema-helper'
import { Resolvers } from '../generated/graphql'
import axios, { AxiosError } from 'axios'

const resolvers: Resolvers = {
  Query: {
    async profile(_, params, context) {
      const { userid } = params

      try {
        const { data: userData } = await axios({
          url: `${process.env.USER_READ_SERVICE}/users/${userid}`,
          method: 'GET',
          responseType: 'json'
        })

        const { data: profileData } = await axios({
          url: `${process.env.USER_READ_SERVICE}/profiles/${userid}`,
          method: 'GET',
          responseType: 'json'
        })

        const { data: litsData } = await axios({
          url: `${process.env.LIT_READ_SERVICE}/lits/${userid}`,
          method: 'GET',
          responseType: 'json'
        })

        return {
          profile: {
            avatar: profileData.profile.avatar,
            username: userData.user.username,
            content: profileData.profile.content,
            lits: litsData
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
