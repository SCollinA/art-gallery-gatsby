import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
// import { onError } from 'apollo-link-error'
// import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import fetch from 'isomorphic-fetch'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true
  }
});

const httpLink = new HttpLink({
  // change this to art-gallery.collinargo.com/graphql for production
  uri: 'http://localhost:4000/graphql',
  link: setContext((_, { headers }) =>{
    const token = localStorage.getItem('auth-token')
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    }
  }),
})

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

export const client = new ApolloClient({
  fetch,
  link,
  cache: new InMemoryCache(),
})