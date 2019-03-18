import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import fetch from 'isomorphic-fetch'
// import { split } from 'apollo-link'
// import { WebSocketLink } from 'apollo-link-ws'
// import { getMainDefinition } from 'apollo-utilities'

// // Create a WebSocket link:
// const wsLink = process.browser ? new WebSocketLink({
//   uri: `ws://localhost:4000/graphql`,
//   options: {
//     reconnect: true,
//     // the below would be used to have authenticated subscriptions
//     // connectionParams: {
//     //   authToken: localStorage.getItem('auth-token')
//     // }
//   },
// }) : null

const httpLink = setContext((_, { headers }) =>{ 
    const token = localStorage.getItem('auth-token')
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    }
  }).concat(new createHttpLink({
  // change this to art-gallery.collinargo.com/graphql for production
  uri: 'http://localhost:4000/graphql',
}))

// // using the ability to split links, you can send data to each link
// // depending on what kind of operation is being sent
// const link = process.browser ? split(
//   // split based on operation type
//   ({ query }) => {
//     const { kind, operation } = getMainDefinition(query);
//     return kind === 'OperationDefinition' && operation === 'subscription';
//   },
//   wsLink, // comes here if above callback returns true
//   httpLink,
// ) : httpLink

export const client = new ApolloClient({
  fetch,
  // link,
  httpLink,
  cache: new InMemoryCache(),
})