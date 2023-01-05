import { GraphQLResolverMap } from '@apollo/subgraph/dist/schema-helper'
import type { Resolvers } from '../generated/graphql'

const resolvers: Resolvers = {
  Query: {
    me() {
      return { username: 'user', email: 'user@user.u', id: 1 }
    }
  },
  Mutation: {
    login() {
      return false
    },
    register() {
      return false
    }
  }
}

export default resolvers as GraphQLResolverMap<any>
