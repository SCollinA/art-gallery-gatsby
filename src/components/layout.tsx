import { graphql, StaticQuery } from "gatsby";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import React from "react";
import {
  Query,
  // Subscription ,
  // ApolloConsumer,
} from "react-apollo";
import { Helmet } from "react-helmet";
// import { client } from '../apollo/client'
import LayoutContext from "../contexts/layoutContext";
import { IArtworkImage } from "../models/artworkImage.model";

import Footer from "./Footer";
import "./layout.css";
import { isNullOrUndefined } from "util";
// import Loading from "./Loading";

const artworkImages: IArtworkImage[] = [];

class Layout extends React.Component<any, any, any> {

  private artworkImages: IArtworkImage[] = [];

  constructor(props: any) {
    super(props);
    this.artworkImages = artworkImages;
  }
  // this function checks if artwork id is in array
  // if not it adds it to array
  private _updateDbImage = ( id: string ) => {
    // console.log("updating artwork images");
    if (!artworkImages.find((artworkImage) => artworkImage.id === id)) {
      artworkImages.push({ id });
    }
  }
  // tslint:disable-next-line: max-line-length
  public static propTypes: { children: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>; };

  public render() {
    const { children } = this.props;
    return (
      <div className="Layout">
        <Helmet>
          <script>
            {`
              window['_fs_debug'] = false;
              window['_fs_host'] = 'fullstory.com';
              window['_fs_org'] = 'K7MTR';
              window['_fs_namespace'] = 'FS';
              (function(m,n,e,t,l,o,g,y){
                  if (e in m) {if(m.console && m.console.log) { m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].');} return;}
                  g=m[e]=function(a,b,s){g.q?g.q.push([a,b,s]):g._api(a,b,s);};g.q=[];
                  o=n.createElement(t);o.async=1;o.src='https://'+_fs_host+'/s/fs.js';
                  y=n.getElementsByTagName(t)[0];y.parentNode.insertBefore(o,y);
                  g.identify=function(i,v,s){g(l,{uid:i},s);if(v)g(l,v,s)};g.setUserVars=function(v,s){g(l,v,s)};g.event=function(i,v,s){g('event',{n:i,p:v},s)};
                  g.shutdown=function(){g("rec",!1)};g.restart=function(){g("rec",!0)};
                  g.consent=function(a){g("consent",!arguments.length||a)};
                  g.identifyAccount=function(i,v){o='account';v=v||{};v.acctId=i;g(o,v)};
                  g.clearUserCookie=function(){};
              })(window,document,window['_fs_namespace'],'script','user');
            `}
          </script>
        </Helmet>
        <header/>
        <div className="Content">
          <Query query={DB_CONTENT}>
            {({ data, loading }: any) => {
              // console.log('running db content query', data)
              const { galleries, artworks } = (!loading && data) ?
                data :
                { galleries: [], artworks: [] };
              return (
                <StaticQuery query={ARTWORK_FILES}
                  render={(artworkFileData: any) => {
                    // console.log('running artwork files static query')
                    // tslint:disable-next-line: max-line-length
                    const artworkFiles = artworkFileData.artworkFiles ? artworkFileData.artworkFiles.edges.map((edge: any) => edge.node) : [];
                    const galleriesWithFiles = galleries.length > 0 ?
                      galleries.map((gallery: any) => {
                        const galleryArtworks = artworks.filter((artwork: any) => artwork.galleryId === gallery.id);
                        return {
                          artworks: galleryArtworks.length > 0 ?
                            // tslint:disable-next-line: max-line-length
                            galleryArtworks.map(({ id, galleryId, title, width, height, medium, price, sold, framed }: any) => {
                              // tslint:disable-next-line: max-line-length
                              const artworkImage = artworkImages.find((galleryArtworkImage: any) => id === galleryArtworkImage.id);
                              // if an artwork file exist add it
                              // will check if file is there to determine proper element for image
                              return {
                                file: artworkFiles.find((artworkFile: any) => artworkFile.name === `${id}-${title}`),
                                framed,
                                galleryId,
                                height,
                                id,
                                image: artworkImage ? artworkImage.image : "",
                                medium,
                                price,
                                sold,
                                title,
                                width,
                              };
                            }) :
                            [{ id: "nada", title: "no artworks"}],
                          id: gallery.id,
                          name: gallery.name,
                        };
                      }) : [{
                        artworks: [{ id: "nada", title: "no galleries #1"}],
                        id: "none",
                        name: "no galleries",
                      }];
                    if (!artworkImages.length) {
                      galleriesWithFiles.forEach((galleryWithFile: any) => {
                        galleryWithFile.artworks.forEach((galleryArtwork: any) => {
                          if (!galleryArtwork.file && galleryArtwork.id !== "nada") {
                            artworkImages.push({
                              id: galleryArtwork.id,
                            });
                          }
                        });
                      });
                    }
                    return (
                      <>
                        {artworkImages.map((artworkImage, index) => {
                          // console.log('each artwork image', artworkImage)
                          return (
                            <Query key={index} query={ARTWORK_IMAGE} variables={{ id: artworkImage.id }} fetchPolicy={"cache-first"}>
                              {({ data: artworkData }: any) => {
                                // console.log('apollo data', data)
                                const foundImage = this.artworkImages.find((dbImage) => dbImage.id === artworkImage.id);
                                if (!isNullOrUndefined(foundImage)) {
                                  // tslint:disable-next-line: max-line-length
                                  foundImage.image = artworkData.getArtwork && artworkData.getArtwork.image;
                                }
                                return null;
                              }}
                            </Query>
                          );
                        })}
                        <LayoutContext.Provider
                          value={{
                            // if galleries has a gallery, add it's artworks
                            galleries: galleriesWithFiles.map((galleryWithFile: any) => {
                              // console.log('artworkImages', artworkImages)
                              return {
                                ...galleryWithFile,
                                artworks: galleryWithFile.artworks.map((galleryArtwork: any) => {
                                  // tslint:disable-next-line: max-line-length
                                  const artworkImage = artworkImages.find((galleryArtworkImage: any) => galleryArtworkImage.id === galleryArtwork.id);
                                  // console.log('artworkImage', artworkImage)
                                  return {
                                    ...galleryArtwork,
                                    image: artworkImage ?
                                    artworkImage.image :
                                    galleryArtwork.image,
                                  };
                                }),
                              };
                            }),
                            updateDbImage: this._updateDbImage,
                          }}
                        >
                          {/* {loading && <Loading/>} */}
                          {children}
                        </LayoutContext.Provider>
                      </>
                    );
                  }}
                />
              );
            }}
          </Query>
          <Footer/>
        </div>
      </div>
    );
  }
}


Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;

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

// export const GET_ARTWORK_IMAGES = gql`
// subscription GetArtworkImages {
//   artworkImageChanged {
//     id
//     image
//   }
// }
// `

const ARTWORK_FILES = graphql`
  {
    artworkFiles: allFile(filter: {
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
