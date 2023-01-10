import { GraphQLResolverMap } from '@apollo/subgraph/dist/schema-helper'
import type { Resolvers } from '../generated/graphql'

const resolvers: Resolvers = {
  Query: {
    me(_, __, context) {
      return { username: 'user', email: 'user@user.u' }
    }
  },
  Mutation: {
    async login(_, params, context) {
      const { email, password, username } = params
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
    register() {
      return false
    }
  }
}

export default resolvers as GraphQLResolverMap<any>
