import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway'

const main = async () => {
  const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
      subgraphs: [{ name: 'profile', url: process.env.PROFILE_SERVICE }, { name: 'auth', url: process.env.AUTH_SERVICE }, { name: 'feed', url: process.env.FEED_SERVICE }]
    })
  })

  const server = new ApolloServer({ gateway })

  const { url } = await startStandaloneServer(server, {
    listen: { port: parseInt(process.env.PORT!) }
  })
  console.log(`🚀  Server ready at ${url}`)
}

main()
