import { graphql } from "gatsby";
import gql from "graphql-tag";

export const DB_CONTENT = gql`
  {
    galleries: getAllGalleries {
        id
        name
    }

    artworks: getAllArtworks {
        id
        galleryId
        title
        width
        height
        medium
        price
        sold
        framed
        recentlyupdatedimage
    }
  }
`;

export const ARTWORK_IMAGE = gql`
  query GetArtworkImage($id: ID) {
    getArtwork(id: $id) {
      id
      image
    }
  }
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

// export const GET_ARTWORK_IMAGES = gql`
// subscription GetArtworkImages {
//   artworkImageChanged {
//     id
//     image
//   }
// }
// `

export const ALL_GALLERIES = gql`
	{
		getAllGalleries {
			id
			name
		}
	}
`;

export const GALLERY_ARTWORKS = gql`
	query GetArtworksForGallery($galleryId: ID) {
		getArtworks(input: { galleryId: $galleryId }) {
			id
			galleryId
			title
			width
			height
			medium
			image
			price
			sold
			framed
		}
	}
`;

export const GET_GALLERY = gql`
	query GetGallery($id: ID!) {
		getGallery(id: $id) {
			name
		}
	}
`;
