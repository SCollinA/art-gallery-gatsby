import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
// import { onError } from 'apollo-link-error'
// import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import fetch from 'isomorphic-fetch';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
})

export const client = new ApolloClient({
  fetch,
  link: setContext((_, { headers }) =>{
    const token = localStorage.getItem('auth-token')
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    }
  }).concat(httpLink),
  cache: new InMemoryCache(),
})