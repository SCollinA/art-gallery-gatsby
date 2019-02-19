import React from "react"
import Layout from '../components/layout'
import SEO from '../components/seo'
import { graphql } from 'gatsby'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

// This query is executed at build time by Gatsby.
export const GatsbyQuery = graphql`
  {
    postgres {
        allArtworksList {
            title
        }
    } 
  }
`

// This query is executed at run time by Apollo.
const APOLLO_QUERY = gql`
  {
    getGallery(id: 1) {
      name
    }
    getAllArtworks {
        id
        title
    }
  }
`;

const AdminPage = ({ data: { postgres } }) => {
  return (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Query query={APOLLO_QUERY}>
        {({ data, loading, error }) => {
            if (loading) return <p>Loading pupper...</p>;
            if (error) return <p>Error: ${error.message}</p>;
            console.log(data)
            const { getGallery: { name }, getAllArtworks } = data
            return (
                <div>
                    <h4>{name}</h4>
                    {getAllArtworks.map(({ id, title }) => {
                        return (
                            <>
                                <h6>{id}</h6>
                                <h6>{title}</h6>
                            </>
                        )
                    })}
                </div>
            )
        }}
    </Query>
    <h4>{postgres.allArtworksList.title}</h4>
    <form>
    </form>
  </Layout>
)}

export default AdminPage