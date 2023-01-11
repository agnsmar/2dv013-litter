import { GraphQLResolverMap } from '@apollo/subgraph/dist/schema-helper'
import { Resolvers } from '../generated/graphql'

const resolvers: Resolvers = {
  Query: {
    feed(_, params, context) {

      return null
    }
  },
  Mutation: {
    addLit(_, params, context) {
      return false
    }
  }
}

export default resolvers as GraphQLResolverMap<any>
