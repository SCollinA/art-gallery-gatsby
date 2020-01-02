import { graphql } from "gatsby";
import gql from "graphql-tag";

export const ArtworkFragment = gql`
  fragment ArtworkFragment on Artwork {
    id
    galleryId
    title
    width
    height
    image
    medium
    price
    sold
    framed
    recentlyupdatedimage
  }
`;

export const GalleryFragment = gql`
  fragment GalleryFragment on Gallery {
    id
    name
  }
`;

export const ADD_ARTWORK = gql`
	mutation AddArtwork($galleryId: ID){
		addArtwork(input: { title: "new artwork", galleryId: $galleryId }) {
			...ArtworkFragment
		}
  }
  ${ArtworkFragment}
`;

export const ADD_GALLERY = gql`
	mutation {
		addGallery(input: { name: "new collection" }) {
			...GalleryFragment
		}
  }
  ${GalleryFragment}
`;

export const ALL_GALLERIES = gql`
	{
		getAllGalleries {
			...GalleryFragment
		}
  }
  ${GalleryFragment}
`;

export const GALLERY_ARTWORKS = gql`
	query GetArtworksForGallery($galleryId: ID) {
		getArtworks(input: { galleryId: $galleryId }) {
			...ArtworkFragment
		}
  }
  ${ArtworkFragment}
`;

export const GET_GALLERY = gql`
	query GetGallery($id: ID!) {
		getGallery(id: $id) {
			...GalleryFragment
		}
  }
  ${GalleryFragment}
`;

export const ALL_ARTWORKS = gql`
  {
    getAllArtworks {
			...ArtworkFragment
		}
  }
  ${ArtworkFragment}
`;

export const ARTWORK_IMAGE = gql`
  query GetArtworkImage($id: ID) {
    getArtwork(id: $id) {
			...ArtworkFragment
		}
  }
  ${ArtworkFragment}
`;

export const fluidImage = graphql`
  fragment fluidImage on File {
    childImageSharp {
      fluid(maxWidth: 3000, quality: 100, srcSetBreakpoints: [200, 340, 520, 890]) {
        ...GatsbyImageSharpFluid_tracedSVG
      }
    }
  }
`;

export const fixedImage = graphql`
  fragment fixedImage on File {
    childImageSharp {
      fixed(width: 3000, quality: 100) {
        ...GatsbyImageSharpFixed_tracedSVG
      }
    }
  }
`;

export const ARTWORK_FILES = graphql`
  {
    artworkFileData: allFile(filter: {
        relativeDirectory: { eq: "artworks" },
        extension: { eq: "jpeg" }
    }) {
      edges {
        node {
          name
          ...fluidImage
        }
      }
    }
  }
`;

// export const GET_ARTWORK_IMAGES = gql`
// subscription GetArtworkImages {
//   artworkImageChanged {
//     id
//     image
//   }
// }
// `

export const UPDATE_GALLERY = gql`
	mutation UpdateGallery($id: ID!, $input: GalleryInput!) {
		updateGallery(id: $id, input: $input) {
			...GalleryFragment
		}
  }
  ${GalleryFragment}
`;

export const DELETE_GALLERY = gql`
	mutation DeleteGallery($id: ID!) {
		deleteGallery(id: $id) {
			...GalleryFragment
		}
  }
  ${GalleryFragment}
`;

export const UPDATE_ARTWORK = gql`
	mutation UpdateArtwork($id: ID!, $input: ArtworkInput) {
		updateArtwork(id: $id, input: $input) {
			...ArtworkFragment
		}
  }
  ${ArtworkFragment}
`;

export const DELETE_ARTWORK = gql`
	mutation DeleteArtwork($id: ID!) {
		deleteArtwork(id: $id) {
			...ArtworkFragment
		}
  }
  ${ArtworkFragment}
`;

export const GALLERY_NAMES = gql`
	{
		getAllGalleries {
			...GalleryFragment
		}
  }
  ${GalleryFragment}
`;

export const CONTACT_MUTATION = gql`
  mutation ContactArtist($name: String, $contactEmail: String, $message: String, $artwork: String) {
	  contactArtist(name: $name, contactEmail: $contactEmail, message: $message, artwork: $artwork)
  }
`;

export const ADMIN_LOGIN = gql`
	mutation AdminLogin($adminPassword: String!) {
		login(password: $adminPassword) {
			token
		}
	}
`;
