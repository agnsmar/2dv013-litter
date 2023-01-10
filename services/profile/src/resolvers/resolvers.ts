import { GraphQLResolverMap } from '@apollo/subgraph/dist/schema-helper'
import { Resolvers } from '../generated/graphql'

const resolvers: Resolvers = {
  Query: {
    profile(_, params, context) {
      const { userid } = params

      // Get user profile data goes here.

      // Get lits from user goes here.

      return {
        avatar: 'oop',
        username: 'bobby',
        content: 'some content',
        lits: [
          {
            content: 'some other content',
            createdAt: Date.now().toString(),
            updatedAt: Date.now().toString()
          }
        ]
      }
    }
  }
}

export default resolvers as GraphQLResolverMap<any>
