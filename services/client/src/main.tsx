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

const GATEWAY_URL = import.meta.env.VITE_GATEWAY_SERVICE
console.log(GATEWAY_URL) //bada bing bada bombombomasdhuiahudsiaduhisadhusi
const httpLink = new HttpLink({ uri: GATEWAY_URL })
const refreshToken = new ApolloLink((operation, forward) => {
  return fromPromise(
    axios({
      url: GATEWAY_URL,
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
