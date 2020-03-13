/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import './src/styles/global.css'
import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import client from './src/apollo/client'

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
)

window.oncontextmenu = () => false
window.ondragstart = () => false
window.onauxclick = () => false