import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppRouter } from './components/router'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import './index.css'

const client = new ApolloClient({
  uri: 'http://localhost/graphql', // Change to env?
  cache: new InMemoryCache(),
  credentials: 'include'
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AppRouter />
    </ApolloProvider>
  </React.StrictMode>
)
