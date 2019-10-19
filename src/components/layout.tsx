import { StaticQuery } from "gatsby";
import React from "react";
import {
  Query,
} from "react-apollo";
import { Helmet } from "react-helmet";

import LayoutContext from "../contexts/layoutContext";
import {
  ARTWORK_FILES,
  ARTWORK_IMAGE,
  DB_CONTENT,
} from "../graphql/graphql";
import { IArtworkImage } from "../models/artworkImage.model";

import Footer from "./Footer";
import GalleryHeader from "./header";
import "./layout.css";

class Layout extends React.Component<any, any, any> {

  private artworkImages: IArtworkImage[] = [];

  constructor(props: any) {
    super(props);
  }

  public render() {
    const { children } = this.props;
    return (
      <div className="Layout">
        <FullStoryHelmet/>
        <GalleryHeader/>
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
                              const artworkImage = this.artworkImages.find((galleryArtworkImage: any) =>
                                id === galleryArtworkImage.id);
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
                    if (!this.artworkImages.length) {
                      galleriesWithFiles.forEach((galleryWithFile: any) => {
                        galleryWithFile.artworks.forEach((galleryArtwork: any) => {
                          if (!galleryArtwork.file && galleryArtwork.id !== "nada") {
                            this.artworkImages.push({
                              id: galleryArtwork.id,
                            });
                          }
                        });
                      });
                    }
                    return (
                      <>
                        {this.artworkImages.map((artworkImage, index) => {
                          // console.log('each artwork image', artworkImage)
                          return (
                            <Query key={index} query={ARTWORK_IMAGE} variables={{ id: artworkImage.id }} fetchPolicy={"cache-first"}>
                              {({ data: artworkData }: any) => {
                                // console.log('apollo data', data)
                                const foundImage = this.artworkImages.find((dbImage) => dbImage.id === artworkImage.id);
                                if (!!foundImage) {
                                  // tslint:disable-next-line: max-line-length
                                  foundImage.image = artworkData &&
                                    artworkData.getArtwork &&
                                    artworkData.getArtwork.image;
                                }
                                return null;
                              }}
                            </Query>
                          );
                        })}
                        <LayoutContextProvider
                          artworkImages={this.artworkImages}
                          children={children}
                          galleriesWithFiles={galleriesWithFiles}
                          updateDbImage={this.updateDbImage}
                        />
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

  // this function checks if artwork id is in array
  // if not it adds it to array
  private updateDbImage = ( id: string ) => {
    if (!this.artworkImages.find((artworkImage) => artworkImage.id === id)) {
      this.artworkImages.push({ id });
    }
  }
}

export default Layout;

const LayoutContextProvider = ({ artworkImages, children, galleriesWithFiles, updateDbImage }: any) => (
  <LayoutContext.Provider
    value={{
      // if galleries has a gallery, add it's artworks
      galleries: galleriesWithFiles.map((galleryWithFile: any) => {
        // console.log('artworkImages', artworkImages)
        return {
          ...galleryWithFile,
          artworks: galleryWithFile.artworks.map((galleryArtwork: any) => {
            const artworkImage = artworkImages.find(
              (galleryArtworkImage: any) =>
                galleryArtworkImage.id === galleryArtwork.id);
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
      updateDbImage,
    }}
  >
    {children}
  </LayoutContext.Provider>
);

const FullStoryHelmet = () => (
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
);
