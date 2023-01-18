import { GraphQLResolverMap } from '@apollo/subgraph/dist/schema-helper'
import { Resolvers } from '../generated/graphql'
import axios from 'axios'

const resolvers: Resolvers = {
  Query: {
    async feed(_, params, context) {
      const { req } = context
      const { offset, take } = params

      try {
        const { data: following } = await axios({
          url: `${process.env.USER_READ_SERVICE}/followings`,
          method: 'GET',
          headers: {
            'Authorization': req.headers['x-access-token'] || ''
          },
          responseType: 'json'
        })

        const followingIds = following.map((user: any) => {
          return user.id
        })

        const { data: lits } = await axios({
          url: `${process.env.LIT_READ_SERVICE}/lits`,
          method: 'GET',
          data: {
            user_ids: followingIds || []
          },
          params: {
            skip: offset,
            take
          },
          responseType: 'json'
        })

        const userMap = new Map()
        for (const follower of following) {
          userMap.set(follower.id, follower.username)
        }

        const feed = lits.map((lit: any) => {
          return {
            username: userMap.get(lit.user_id),
            userId: lit.user_id,
            content: lit.content,
            createdAt: lit.created_at,
            updatedAt: lit.updated_at
          }
        })

        return feed
      } catch (e) {
        console.error(e)
        return null
      }
    }
  },
  Mutation: {
    addLit(_, params, context) {
      return false
    }
  }
}

export default resolvers as GraphQLResolverMap<any>
