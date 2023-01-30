import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppRouter } from './components/router'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
  fromPromise,
  concat
} from '@apollo/client'
import './css/index.css'
import axios from 'axios'

const httpLink = new HttpLink({ uri: 'http://localhost/graphql' })
const refreshToken = new ApolloLink((operation, forward) => {
  return fromPromise(
    axios({
      url: 'http://localhost/graphql',
      method: 'POST',
      withCredentials: true,
      data: {
        operationName: 'refreshToken',
        query: 'mutation refreshToken { refreshToken }',
        variables: {}
      }
    })
  ).flatMap(() => forward(operation))
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  credentials: 'include',
  link: concat(refreshToken, httpLink)
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AppRouter />
    </ApolloProvider>
  </React.StrictMode>
)
