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
            ...lit
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
    async addLit(_, params, context) {
      const { content } = params
      const { conn, token } = context

      if (!token) {
        return {
          success: false,
          error: {
            message: 'Unauthorized'
          }
        }
      }

      const maxContentLength = 42
      if (content.length > maxContentLength) {
        return {
          success: false,
          error: {
            message: `Lit must be less than ${maxContentLength} characters`
          }
        }
      } else if (content.length === 0) {
        return {
          success: false,
          error: {
            message: 'Lit cannot be empty'
          }
        }
      }

      const queue = 'lit-create'
      const ch = await conn.createChannel()
      await ch.assertQueue(queue, { durable: false})
      ch.sendToQueue(queue, Buffer.from(JSON.stringify({ content, user_id: token.userid })))

      return {
        success: true
      }
    },
    async removeLit(_, params, context) {
      const { id } = params
      const { conn, token } = context

      if (!token) {
        return {
          success: false,
          error: {
            message: 'Unauthorized'
          }
        }
      }

      const queue = 'lit-delete'
      const ch = await conn.createChannel()
      await ch.assertQueue(queue, { durable: false})
      ch.sendToQueue(queue, Buffer.from(JSON.stringify({ lit_id: id, user_id: token.userid })))

      return {
        success: true
      }
    }
  }
}

export default resolvers as GraphQLResolverMap<any>
