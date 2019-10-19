import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { ApolloLink, GraphQLRequest } from "apollo-link";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
import _fetch from "isomorphic-fetch";
// Import { split } from 'apollo-link'
// Import { WebSocketLink } from 'apollo-link-ws'
// Import { getMainDefinition } from 'apollo-utilities'

// // Create a WebSocket link:
// Const wsLink = process.browser ? new WebSocketLink({
//   Uri: `ws://localhost:4000/graphql`,
//   Options: {
//     Reconnect: true,
//     // the below would be used to have authenticated subscriptions
//     // connectionParams: {
//     //   authToken: localStorage.getItem('auth-token')
//     // }
//   },
// }) : null

// tslint:disable-next-line: no-unsafe-any no-any
const httpLink: ApolloLink = setContext((_: GraphQLRequest, { headers }: any) => {
    const token: string | null = localStorage.getItem("auth-token");

    return {
      headers: {
        ...headers,
        authorization: token !== null ? `Bearer ${token}` : "",
      },
    };
  })
  .concat(createHttpLink({
  // ISSUE: https://github.com/apollographql/apollo-link/issues/513
  // tslint:disable-next-line: no-any
  fetch: _fetch as any,
  // Change this to art-gallery.collinargo.com/graphql for production
  uri: "http://localhost:4000/graphql",
}));

// // using the ability to split links, you can send data to each link
// // depending on what kind of operation is being sent
// Const link = process.browser ? split(
//   // split based on operation type
//   ({ query }) => {
//     Const { kind, operation } = getMainDefinition(query);
//     Return kind === 'OperationDefinition' && operation === 'subscription';
//   },
//   WsLink, // comes here if above callback returns true
//   HttpLink,
// ) : httpLink

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: new InMemoryCache(),
  // Link,
  link: httpLink,
});